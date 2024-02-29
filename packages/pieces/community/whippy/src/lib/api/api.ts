import { AuthenticationType } from "@activepieces/pieces-common";

// api.ts
export interface APICallParams {
    url: string;
    method: string;
    // apiKey: string;
    authentication: {
        type: string;
        token: string;
    };
    body?: object;
    params?: object;
}

// Define a generic ApiResponse interface
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

const rootUrl = 'https://api.whippy.co/v1';

export async function callAPI<T>({ url, method, body }: APICallParams): Promise<ApiResponse<T>> {
    const options = {
        method: method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            // 'X-WHIPPY-KEY': apiKey,
        },
        authentication: {
            type: AuthenticationType.BEARER_TOKEN,
            token: "4ef1e26c-b282-4645-966c-395d623917c6"
        },
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        // Use ApiResponse<T> to specify the expected data type
        return {
            success: true,
            data: responseData as T,
            message: 'API request successful',
        };
    } catch (error) {
        console.error(error);
        // Return an ApiResponse with success: false and an error message
        return {
            success: false,
            data: error as T,
            message: 'API request failed',
        };
    }
}

export class Message {
    static async sendMessage(apiKey: string, fromNumber: string, toNumber: string, body: string | undefined,
        scheduleAt: string | undefined, attachments: any[] | undefined, optIn: object | undefined, 
        optChannels: boolean | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/messaging/sms`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                from: fromNumber,
                to: toNumber,
                body: body,
                attachments: attachments,
                schedule_at: scheduleAt,
                opt_in_to: optIn,
                opt_in_to_all_channels: optChannels,
            },
        };

        return await callAPI(apiParams);
    }
}

export class Note {
    static async createNote(apiKey: string, fromNumber: string, body: string | undefined, toNumber: string,
        attachments: any[] | undefined, optIn: object | undefined, optChannels: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/messaging/note`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                from: fromNumber,
                to: toNumber,
                body: body,
                attachments: attachments,
                opt_in_to: optIn,
                opt_in_to_all_channels: optChannels,
            },
        };

        return await callAPI(apiParams);
    }
}

export class Contact {
    static async createContact(apiKey: string, email: string | undefined, name: string | undefined, phoneNumber: string,
        optTo: any[] | undefined, optChannel: boolean |  undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/contacts`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                phone: phoneNumber,
                email: email,
                name: name,
                opt_in_to: [ optTo ],
                opt_in_to_all_channels: optChannel,
            },
        };

        return await callAPI(apiParams);
    }

    static async listContacts(apiKey: string, limit: number | undefined, offset: number | undefined, email: string | undefined, 
        name: string | undefined, phone: string | undefined, channelsID: any[] | undefined,
        channelsPhone: any[] | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/contacts?channels[][id]=${channelsID}&channels[][phone]=${channelsPhone}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            params: {
                limit: limit,
                offset: offset,
                name: name,
                email: email,
                phone: phone,
            },
        };

        return await callAPI(apiParams);
    }

    static async updateContacts(apiKey: string, contactId: string, email: string | undefined, name: string | undefined, phoneNumber: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/contacts/${contactId}`,
            method: 'PUT',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                phone: phoneNumber,
                email: email,
                name: name,
            },
        };

        return await callAPI(apiParams);
    }
}

export class Conversation {
    static async listConversations(apiKey: string, limit: number | undefined, offset: number | undefined,
        unreadCount: number | undefined, status: any[] | undefined, type: string | undefined, channelsId: any[] | undefined,
        channelsPhone: any[] | undefined, contactId: any[] | undefined, contactName: any[] | undefined,
        contactPhone: any[] | undefined, contactEmail: any[] | undefined, lastMessage: object | undefined,
        createdAt: object | undefined, updatedAt: object | undefined, assignedUsers: any[] | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/conversations?limit=${limit}&unread_count=${unreadCount}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }

    static async listMessages(apiKey: string, conversationId: string , messages: object | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/conversations/${conversationId}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            params: {
                messages: messages
            }
        };

        return await callAPI(apiParams);
    }
}

export class Channels {
    static async listUserChannels(apiKey: string, channelId: string, offset: number, limit: number): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/channels/${channelId}/users?offset=${offset}&limit=${limit}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };
        return await callAPI(apiParams);
    }

    static async listChannels(apiKey: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/channels`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };
        return await callAPI(apiParams);
    }

    static async showChannels(apiKey: string , channelId: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/channels/${channelId}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };
        return await callAPI(apiParams);
    }
}
export class Sequence {
    static async getSequences(apiKey: string, offset: number, limit: number, title: string): Promise<ApiResponse<any>> {
        const url = `${rootUrl}/sequences?limit=${limit}&offset=${offset}&title=${encodeURIComponent(title)}`;

        const apiParams: APICallParams = {
            url: url,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };

        return await callAPI(apiParams);
    }

    static async showSequence(apiKey: string, sequenceId: string): Promise<ApiResponse<any>> {
        const url = `${rootUrl}/sequences/${sequenceId}`;

        const apiParams: APICallParams = {
            url: url,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };

        return await callAPI(apiParams);
    }

    static async showSequenceRun(apiKey: string, sequenceId: string, runId: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/sequences/${sequenceId}/sequence_runs/${runId}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };
        return await callAPI(apiParams);
    }

    static async listSequenceRuns(apiKey: string, sequenceId: string, options: {
        limit: number,
        offset: number,
        phone: string,
        status: string,
        channelId: string,
        before: string,
        after: string
    }): Promise<ApiResponse<any>> {
        const { limit, offset, phone, status, channelId, before, after } = options;

        const queryParams = `limit=${limit}&offset=${offset}&phone=${encodeURIComponent(phone)}&status=${status}&channel_id=${channelId}&before=${encodeURIComponent(before)}&after=${encodeURIComponent(after)}`;

        const apiParams: APICallParams = {
            url: `${rootUrl}/sequences/${sequenceId}/sequence_runs?${queryParams}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }

    static async listSequenceContacts(apiKey: string, sequenceId: string, options: {
        limit: number,
        offset: number,
        status: string,
        stepIds: string,
        responded: boolean,
        unsubscribed: boolean,
        clickedLink: boolean,
    }): Promise<ApiResponse<any>> {
        const { limit, offset, status, stepIds, responded, unsubscribed, clickedLink } = options;

        const queryParams = `limit=${limit}&offset=${offset}&status=${status}&step_ids=${stepIds}&responded=${responded}&unsubscribed=${unsubscribed}&clicked_link=${clickedLink}`;

        const apiParams: APICallParams = {
            url: `${rootUrl}/sequences/${sequenceId}/contacts?${queryParams}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }

    static async createSequenceContacts(apiKey: string, seqID: string, fromNumber: string, toNumber: object, stepID: string | undefined,
        scheduleAt: string | undefined, customData: object | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/sequences/${seqID}/contacts`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                custom_data: customData,
                from: fromNumber,
                schedule_at: scheduleAt,
                step_id: stepID,
                to: toNumber,
            },
        };

        return await callAPI(apiParams);
    }
}

export class Organization {
    static async showOrganization(apiKey: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/organization`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }
}

export class Automation {
    static async listAutomation(apiKey: string, limit: number | undefined, offset: number | undefined,
        title: string | undefined, archived: string | undefined, accessLevel: string | undefined, createdBy: any[] | undefined,
        updatedBy: any[] | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/automations/templates?limit=${limit}&offset=${offset}&title=${title}&archived=${archived}&access_level=${accessLevel}
            &created_by[]=${createdBy}&updated_by[]=${updatedBy}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }
}

export class Tag {
    static async createTag(apiKey: string, name: string | undefined, color: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/tags`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                name: name,
                color: color
            },
        };

        return await callAPI(apiParams);
    }

    static async listTags(apiKey: string, limit: number | undefined, offset: number | undefined,
        search: string | undefined, state: string | undefined, system: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/tags?limit=${limit}&offset=${offset}&search=${search}&state=${state}&system=${system}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }

    static async updateTag(apiKey: string, tagId: string, color: string | undefined, name: string | undefined, state: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/tags/${tagId}`,
            method: 'PUT',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                color: color,
                name: name,
                state: state,
            },
        };

        return await callAPI(apiParams);
    }

    static async deleteTag(apiKey: string, tagId: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/tags/${tagId}`,
            method: 'DELETE',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }
}

export class Campaign {
    static async showCampaign(apiKey: string, campaignID: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/campaigns/${campaignID}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }

    static async listCampaigns(apiKey: string, limit: number | undefined, offset: number | undefined,
        title: string | undefined, status: any[] | undefined, channelID: any[] | undefined, 
        channelPhone: any[] | undefined, createdBy: any[] | undefined, updatedBy: any[] | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/campaigns?limit=${limit}&offset=${offset}&title=${title}&channels[][id]=${channelID}
            &channels[][phone]=${channelPhone}&created_by[]=${createdBy}&updated_by[]=${updatedBy}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }

    static async listCampaignContacts(apiKey: string, campaignID: string, limit: number | undefined, offset: number | undefined,
        delivered: boolean | undefined, responded: boolean | undefined, unsubscribed: boolean | undefined,
        clickedLink: boolean | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/campaigns/${campaignID}/contacts?limit=${limit}&offset=${offset}&delivered=${delivered}&responded=${responded}&unsubscribed=${unsubscribed}&clicked_level=${clickedLink}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
        };

        return await callAPI(apiParams);
    }
}

export class CustomObject {
    static async createCustomObjects(apiKey: string, key: string, label: string, customProperties: object): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                key: key,
                label: label,
                custom_properties: [customProperties] || [{}]
            },
        };

        return await callAPI(apiParams);
    }

    static async updateCustomObject(apiKey: string, customId: string, recordId: string, associatedId: string | undefined,
        recordType: string | undefined, externalId: string | undefined, properties: object | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records/${recordId}`,
            method: 'PUT',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                associated_record_id: associatedId,
                associated_record_type: recordType,
                external_id: externalId,
                properties: properties
            },
        };

        return await callAPI(apiParams);
    }

    static async createCustomProperty(apiKey: string, customId: string, key: string, label: string, 
        required: string | undefined, type: string, cusDefault: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/properties`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                key: key,
                label: label,
                default: cusDefault,
                required: required,
                type: type
            },
        };

        return await callAPI(apiParams);
    }

    static async updateCustomProperty(apiKey: string, customId: string, recordId: string, propertyId: string,
        value: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records/${recordId}/properties/${propertyId}`,
            method: 'PUT',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                value: value
            },
        };

        return await callAPI(apiParams);
    }

    static async createCustomRecord(apiKey: string, customId: string, associatedId: string | undefined,
        recordType: string | undefined, externalId: string | undefined, properties: object | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records`,
            method: 'POST',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            },
            body: {
                associated_record_id: associatedId,
                associated_record_type: recordType,
                external_id: externalId,
                properties: properties
            },
        };

        return await callAPI(apiParams);
    }

    static async listCustomObjects(apiKey: string, limit: number | undefined, offset: number | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects?limit=${limit}&offset=${offset}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };

        return await callAPI(apiParams);
    }

    static async listCustomProperty(apiKey: string, customId: string | undefined, limit: number | undefined, offset: number | undefined,
        associatedId: string | undefined, recordType: string | undefined, before: string | undefined, after: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/property_values?custom_object_id=${customId}&associated_resource_id=${associatedId}&associated_resource_type=${recordType}
            &before=${before}&after=${after}&offset=${offset}&limit=${limit}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };

        return await callAPI(apiParams);
    }

    static async listCustomRecords(apiKey: string, customId: string, limit: number | undefined, offset: number | undefined,
        associatedId: string | undefined, recordType: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records?associated_resource_id=${associatedId}&associated_resource_type=${recordType}&offset=${offset}&limit=${limit}`,
            method: 'GET',
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: apiKey
            }
        };

        return await callAPI(apiParams);
    }
}
