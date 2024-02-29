import {
    ActivepiecesError,
    ErrorCode,
    PieceTrigger,
    ProjectId,
    isNil,
} from '@activepieces/shared'
import { pieceMetadataService } from '../../../pieces/piece-metadata-service'
import { TriggerBase } from '@activepieces/pieces-framework'

export async function getPieceTrigger({
    trigger,
    projectId,
}: {
    trigger: PieceTrigger
    projectId: ProjectId
}): Promise<TriggerBase> {
    const piece = await pieceMetadataService.getOrThrow({
        projectId,
        name: trigger.settings.pieceName,
        version: trigger.settings.pieceVersion,
    })

    if (isNil(piece)) {
        throw new ActivepiecesError({
            code: ErrorCode.PIECE_NOT_FOUND,
            params: {
                pieceName: trigger.settings.pieceName,
                pieceVersion: trigger.settings.pieceVersion,
            },
        })
    }
    const pieceTrigger = piece.triggers[trigger.settings.triggerName]
    if (isNil(pieceTrigger)) {
        throw new ActivepiecesError({
            code: ErrorCode.PIECE_TRIGGER_NOT_FOUND,
            params: {
                pieceName: trigger.settings.pieceName,
                pieceVersion: trigger.settings.pieceVersion,
                triggerName: trigger.settings.triggerName,
            },
        })
    }
    return pieceTrigger
}
