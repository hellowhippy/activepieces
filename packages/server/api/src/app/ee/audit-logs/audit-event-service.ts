import { databaseConnection } from '../../database/database-connection'
import { AuditEventEntity } from './audit-event-entity'
import {
    Cursor,
    PrincipalType,
    SeekPage,
    apId,
    assertNotNullOrUndefined,
    isNil,
} from '@activepieces/shared'
import { PlatformId } from '@activepieces/ee-shared'
import { buildPaginator } from '../../helper/pagination/build-paginator'
import { paginationHelper } from '../../helper/pagination/pagination-utils'
import {
    ApplicationEventHooks,
    CreateAuditEventParam,
} from '../../helper/application-events'
import {
    ApplicationEvent,
    ApplicationEventName,
} from '@activepieces/ee-shared'
import { userService } from '../../user/user-service'
import { projectService } from '../../project/project-service'
import { FastifyRequest } from 'fastify'
import { extractClientRealIp } from '../../helper/network-utils'
import { rejectedPromiseHandler } from 'server-shared'

const auditLogRepo = databaseConnection.getRepository(AuditEventEntity)

type AuditLogService = {
    send: ApplicationEventHooks['send']
    list: (params: {
        platformId: PlatformId
        cursorRequest: Cursor | null
        limit: number
    }) => Promise<SeekPage<ApplicationEvent>>
}

export const auditLogService: AuditLogService = {
    send(request, rawEvent) {
        rejectedPromiseHandler(saveEvent(request, rawEvent))
    },
    async list({
        platformId,
        cursorRequest,
        limit,
    }: {
        platformId: PlatformId
        cursorRequest: Cursor | null
        limit: number
    }): Promise<SeekPage<ApplicationEvent>> {
        const decodedCursor = paginationHelper.decodeCursor(cursorRequest)
        const paginator = buildPaginator({
            entity: AuditEventEntity,
            query: {
                limit,
                order: 'ASC',
                afterCursor: decodedCursor.nextCursor,
                beforeCursor: decodedCursor.previousCursor,
            },
        })
        const paginationResponse = await paginator.paginate(
            auditLogRepo.createQueryBuilder('audit_event').where({ platformId }),
        )
        return paginationHelper.createPage<ApplicationEvent>(
            paginationResponse.data,
            paginationResponse.cursor,
        )
    },
}

const saveEvent = async (
    request: FastifyRequest,
    rawEvent: CreateAuditEventParam,
) => {
    if (
        ![PrincipalType.USER, PrincipalType.UNKNOWN].includes(
            request.principal.type,
        )
    ) {
        return
    }
    const userInformation = await userService.getMetaInfo({
        id: rawEvent.userId,
    })
    assertNotNullOrUndefined(userInformation, 'UserInformation')
    if (isNil(userInformation.platformId)) {
        return
    }
    const project = await projectService.getOne(request.principal.projectId)

    const baseProps = {
        id: apId(),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        userId: rawEvent.userId,
        projectId: project ? project.id : undefined,
        projectDisplayName: project ? project.displayName : undefined,
        userEmail: userInformation.email,
        platformId: userInformation.platformId!,
        ip: extractClientRealIp(request),
    }
    let eventToSave: ApplicationEvent | undefined
    switch (rawEvent.action) {
        case ApplicationEventName.SIGNED_IN:
        case ApplicationEventName.RESET_PASSWORD:
        case ApplicationEventName.VERIFIED_EMAIL:
        case ApplicationEventName.SIGNED_UP: {
            eventToSave = {
                ...baseProps,
                action: rawEvent.action,
                data: {},
            }
            break
        }
        case ApplicationEventName.CREATED_FLOW:
        case ApplicationEventName.DELETED_FLOW: {
            eventToSave = {
                ...baseProps,
                action: rawEvent.action,
                data: {
                    flowId: rawEvent.flow.id,
                    flowName: rawEvent.flow.version.displayName,
                },
            }
            break
        }
        case ApplicationEventName.UPSERTED_CONNECTION:
        case ApplicationEventName.DELETED_CONNECTION: {
            eventToSave = {
                ...baseProps,
                action: rawEvent.action,
                data: {
                    connectionId: rawEvent.connection.id,
                    connectionName: rawEvent.connection.name,
                },
            }
            break
        }
        case ApplicationEventName.CREATED_FOLDER:
        case ApplicationEventName.UPDATED_FOLDER:
        case ApplicationEventName.DELETED_FOLDER: {
            eventToSave = {
                ...baseProps,
                action: rawEvent.action,
                data: {
                    folderId: rawEvent.folder.id,
                    folderName: rawEvent.folder.displayName,
                },
            }
            break
        }
    }
    await auditLogRepo.save(eventToSave)
}
