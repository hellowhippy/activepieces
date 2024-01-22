import { AuthenticationType, HttpMessageBody, HttpMethod, HttpRequest, HttpResponse, httpClient } from "@activepieces/pieces-common"

export interface WebhookInformation {
    limit: string
    offset: string
    name: string
    active: string
}

const baseUrl = 'https://api.whippy.co/v1/';

export const listCommon = {
    subscribeWebhook: async (limit: number,
        offset: number,
        name: string,
        active: string,
        tag: string, webhookUrl: string, accessToken: string) => {
        const request: HttpRequest = {
            method: HttpMethod.GET,
            url: `${baseUrl}/developers/applications/webhooks/${tag}`,
            headers: {
                "Content-Type": "application/json"
            },
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: accessToken,
            },
            body: {
                address: webhookUrl,
            },
            queryParams: {
                limit: limit.toString(),
                offset: offset.toString(),
                name: name,
                active: active
            }
        }
        await httpClient.sendRequest(request);
    },

    async unsubscribeWebhook(target: string, tag: string, accessToken: string) {
        const request: HttpRequest = {
            method: HttpMethod.DELETE,
            url: `${baseUrl}/developers/applications/webhooks/${tag}`,
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

export const createCommon = {
    subscribeWebhook: async (target: string, tag: string, webhookUrl: string, accessToken: string) => {
        const request: HttpRequest = {
            method: HttpMethod.POST,
            url: `${baseUrl}/developers/applications/webhooks/${tag}`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                enabled: true,
                url: webhookUrl,
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
  
    async unsubscribeWebhook(target: string, tag: string, accessToken: string) {
        const request: HttpRequest = {
            method: HttpMethod.DELETE,
            url: `${baseUrl}/developers/applications/webhooks/${tag}`,
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

export const showCommon = {
    subscribeWebhook: async (id: string, tag: string, webhookUrl: string, accessToken: string) => {
        const request: HttpRequest = {
            method: HttpMethod.GET,
            url: `${baseUrl}/developers/applications/${id}/webhooks/${tag}`,
            headers: {
                "Content-Type": "application/json"
            },
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: accessToken,
            },
            body: {
                address: webhookUrl
            },
            queryParams: {},
        }

        await httpClient.sendRequest(request);
    },

    async unsubscribeWebhook(id: string, tag: string, accessToken: string) {
        const request: HttpRequest = {
            method: HttpMethod.DELETE,
            url: `${baseUrl}/developers/applications/${id}/webhooks/${tag}`,
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


export const updateCommon = {
    subscribeWebhook: async (id: string, target: string, tag: string, webhookUrl: string, accessToken: string) => {
        const request: HttpRequest = {
            method: HttpMethod.PUT,
            url: `${baseUrl}/developers/applications/${id}/webhooks/${tag}`,
            headers: {
                "Content-Type": "application/json"
            },
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: accessToken,
            },
            body: {
                address: webhookUrl,
                target: target
            }
        }
        await httpClient.sendRequest(request);
    },

    async unsubscribeWebhook(id: string, target: string, tag: string, accessToken: string) {
        const request: HttpRequest = {
            method: HttpMethod.DELETE,
            url: `${baseUrl}/developers/applications/${id}/webhooks/${tag}`,
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

export async function callwhippyapi<T extends HttpMessageBody>(method: HttpMethod, apiUrl: string, accessToken: string, body: any | undefined): Promise<HttpResponse<T>> {
    return await httpClient.sendRequest<T>({
        method: method,
        url: `https://api.whippy.co/v1/${apiUrl}`,
        authentication: {
            type: AuthenticationType.BEARER_TOKEN,
            token: accessToken
        },
        body: body
    })
}