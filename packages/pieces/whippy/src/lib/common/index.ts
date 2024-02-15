import { AuthenticationType , HttpMethod , HttpRequest , httpClient } from "@activepieces/pieces-common"

export interface WebhookInformation {
    limit: string
    offset: string
    name: string
    active: string
}

const baseUrl = 'https://api.whippy.co/v1/';

export interface WebhookInform {
    id: string
    target: string
    type: string
    address: string
    created_at: string
    created_by: string
    triggers: string[]
}

export const exampleCommon = {
    subscribeWebhook: async (target: string, event: string, webhookUrl: string, accessToken: string) => {
        const request: HttpRequest = {
            method: HttpMethod.POST,
            url: `${baseUrl}developers/endpoints`,
            headers: {
                "Content-Type": "application/json",
                "X-WHIPPY-KEY": accessToken
            },
            body: {
                developer_application_id: "e5639aa5-6d8d-4802-a146-5be9caafc93b",
                active: true,
                url: webhookUrl,
                event_types: [event],
                target: target
            },
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: accessToken,
            },
            queryParams: {},
        };

        await httpClient.sendRequest(request);
    },
  
    async unsubscribeWebhook(accessToken: string, webhookId: string) {
        const request: HttpRequest = {
            method: HttpMethod.DELETE,
            url: `${baseUrl}/webhooks/${webhookId}`,
            headers: {
                "Content-Type": "application/json"
            },
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: accessToken,
            },
        };
        return await httpClient.sendRequest(request);
    }
}