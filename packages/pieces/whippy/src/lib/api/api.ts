// api.ts
export interface APICallParams {
    url: string;
    method: string;
    apiKey: string;
    body?: object;
    params?: { // Make params optional
        name: string | undefined;
        email: string | undefined;
        phone: string | undefined;
    };
}

// Define a generic ApiResponse interface
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

const rootUrl = 'https://api.whippy.co/v1';

export async function callAPI<T>({ url, method, apiKey, body }: APICallParams): Promise<ApiResponse<T>> {
    const options = {
        method: method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-WHIPPY-KEY': apiKey,
        },
        body: JSON.stringify(body),
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
    static async sendMessage(apiKey: string, from: string, to: string, message: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/messaging/sms`,
            method: 'POST',
            apiKey: apiKey,
            body: { from: from, to: to, body: message },
        };

        return await callAPI(apiParams);
    }
}

export class Note {
    static async createNote(apiKey: string,from: string, note: string, phoneNumber: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/messaging/note`,
            method: 'POST',
            apiKey: apiKey,
            body: { from: from, to: phoneNumber, body: note },
        };

        return await callAPI(apiParams);
    }
}

export class Contact {
    static async createContact(apiKey: string, email: string | undefined, name: string | undefined, phoneNumber: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/contacts`,
            method: 'POST',
            apiKey: apiKey,
            body: {
                phone: phoneNumber,
                email: email,
                name: name,
            },
        };

        return await callAPI(apiParams);
    }

    static async listContacts(apiKey: string, email: string | undefined, name: string | undefined, phone: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/contacts?limit=50&offset=0`,
            method: 'GET',
            apiKey: apiKey,
            params: {
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
            apiKey: apiKey,
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
    static async listConversations(apiKey: string, limit: number | undefined, unreadCount: number | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/conversations?limit=${limit}&unread_count=${unreadCount}`,
            method: 'GET',
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }

    static async listMessages(apiKey: string, conversationId: string , limit: number, offset: number): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/conversations/${conversationId}?messages[limit]=${limit}&messages[offset]=${offset}`,
            method: 'GET',
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }
}

export class Channels {
    static async listUserChannels(apiKey: string, channelId: string, offset: number, limit: number): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/channels/${channelId}/users?offset=${offset}&limit=${limit}`,
            method: 'GET',
            apiKey: apiKey
        };
        return await callAPI(apiParams);
    }

    static async listChannels(apiKey: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/channels`,
            method: 'GET',
            apiKey: apiKey
        };
        return await callAPI(apiParams);
    }

    static async showChannels(apiKey: string , channelId: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/channels/${channelId}`,
            method: 'GET',
            apiKey: apiKey
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
            apiKey: apiKey
        };

        return await callAPI(apiParams);
    }

    static async showSequence(apiKey: string, sequenceId: string): Promise<ApiResponse<any>> {
        const url = `${rootUrl}/sequences/${sequenceId}`;

        const apiParams: APICallParams = {
            url: url,
            method: 'GET',
            apiKey: apiKey
        };

        return await callAPI(apiParams);
    }

    static async showSequenceRun(apiKey: string, sequenceId: string, runId: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/sequences/${sequenceId}/sequence_runs/${runId}`,
            method: 'GET',
            apiKey: apiKey,
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
            apiKey: apiKey,
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
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }

    static async createSequenceContacts(apiKey: string, seqID: string, fromNumber: string, toNumber: object, stepID: string | undefined,
        scheduleAt: string | undefined, customData: object | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/sequences/${seqID}/contacts`,
            method: 'POST',
            apiKey: apiKey,
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
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }
}

export class Automation {
    static async listAutomation(apiKey: string, limit: number | undefined, offset: number | undefined,
        title: string | undefined, archived: string | undefined, accessLevel: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/automations/templates?limit=${limit}&offset=${offset}&title=${title}&archived=${archived}&access_level=${accessLevel}`,
            method: 'GET',
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }
}

export class Tag {
    static async createTag(apiKey: string, name: string | undefined, color: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/tags`,
            method: 'POST',
            apiKey: apiKey,
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
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }

    static async udpateTag(apiKey: string, tagId: string, color: string | undefined, name: string | undefined, state: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/tags/${tagId}`,
            method: 'PUT',
            apiKey: apiKey,
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
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }
}

export class Campaign {
    static async showCampaign(apiKey: string, campaignID: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/campaigns/${campaignID}`,
            method: 'GET',
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }

    static async listCampaigns(apiKey: string, limit: number | undefined, offset: number | undefined, title: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/campaigns?limit=${limit}&offset=${offset}&title=${title}`,
            method: 'GET',
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }

    static async listCampaignContacts(apiKey: string, campaignID: string, limit: number | undefined, offset: number | undefined,
        delivered: string | undefined, responded: string | undefined,
        unsubscribed: string | undefined, clickedLink: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/campaigns/${campaignID}/contacts?limit=${limit}&offset=${offset}&delivered=${delivered}&responded=${responded}&unsubscribed=${unsubscribed}&clicked_level=${clickedLink}`,
            method: 'GET',
            apiKey: apiKey,
        };

        return await callAPI(apiParams);
    }
}

export class CustomObject {
    static async createCustomObjects(apiKey: string, key: string, label: string, customProperties: object): Promise<ApiResponse<any>> {
        console.log("----------------", customProperties)
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects`,
            method: 'POST',
            apiKey: apiKey,
            body: {
                key: key,
                label: label,
                custom_properties: [customProperties] || [{}]
            },
        };

        return await callAPI(apiParams);
    }

    static async updateCustomObject(apiKey: string, customId: string, recordId: string, associatedId: string,
        recordType: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records/${recordId}`,
            method: 'PUT',
            apiKey: apiKey,
            body: {
                associated_record_id: associatedId,
                associated_record_type: recordType
            },
        };

        return await callAPI(apiParams);
    }

    static async createCustomProperty(apiKey: string, customId: string, key: string, label: string, 
        required: string | undefined, type: string, cusDefault: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/properties`,
            method: 'POST',
            apiKey: apiKey,
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
            apiKey: apiKey,
            body: {
                value: value
            },
        };

        return await callAPI(apiParams);
    }

    static async createCustomRecord(apiKey: string, customId: string, associatedId: string, recordType: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records`,
            method: 'POST',
            apiKey: apiKey,
            body: {
                associated_record_id: associatedId,
                associated_record_type: recordType
            },
        };

        return await callAPI(apiParams);
    }

    static async listCustomObjects(apiKey: string, limit: number | undefined, offset: number | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects?limit=${limit}&offset=${offset}`,
            method: 'GET',
            apiKey: apiKey,
            body: {

            },
        };

        return await callAPI(apiParams);
    }

    static async listCustomProperty(apiKey: string, customId: string | undefined, limit: number | undefined, offset: number | undefined,
        associatedId: string | undefined, recordType: string | undefined, before: string | undefined, after: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/property_values?custom_object_id=${customId}&associated_resource_id=${associatedId}&associated_resource_type=${recordType}
            &before=${before}&after=${after}&offset=${offset}&limit=${limit}`,
            method: 'GET',
            apiKey: apiKey,
            body: {
            },
        };

        return await callAPI(apiParams);
    }

    static async listCustomRecords(apiKey: string, customId: string, limit: number | undefined, offset: number | undefined,
        associatedId: string | undefined, recordType: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/custom_objects/${customId}/records?associated_resource_id=${associatedId}&associated_resource_type=${recordType}&offset=${offset}&limit=${limit}`,
            method: 'GET',
            apiKey: apiKey,
            body: {
            },
        };

        return await callAPI(apiParams);
    }
}