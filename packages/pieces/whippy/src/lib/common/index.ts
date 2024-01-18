import { AuthenticationType, HttpMethod, HttpRequest, httpClient } from "@activepieces/pieces-common"

export interface WebhookInformation {
    limit: string
    offset: string
    name: string
    active: string
}

const baseUrl = 'https://api.whippy.co/v1/';

export const listCommon = {
    async subscribeWebhook(auth: any, data: {
    event: string,
    target: {
        limit: number,
        offset: number,
        name: string,
        active: string
    },
    webhookUrl: string
}) {
    const request: HttpRequest = {
        method: HttpMethod.GET,
        url: `${baseUrl}/applications?limit=${data.target.limit}&offset=${data.target.offset}&name=${data.target.name}&active=${data.target.active}`,
        authentication: {
            type: AuthenticationType.BEARER_TOKEN,
            token: auth.access_token,
        },
        body: {
            address: data.webhookUrl,
            triggers: [data.event]
        }
    }

    const response = await httpClient.sendRequest<WebhookInformation>(request);
    return response.body;
},

// async unsubscribeWebhook(auth: any, webhookId: string) {
//     const request: HttpRequest = {
//         method: HttpMethod.DELETE,
//         url: `${baseUrl}/webhooks/${webhookId}`,
//         authentication: {
//             type: AuthenticationType.BEARER_TOKEN,
//             token: auth.access_token,
//         }
//     };

//     const response = await httpClient.sendRequest(request);
//     return response;
//     }
}

export const createCommon = {
    async subscribeWebhook(auth: any, data: {
        event: string,
        target: {
            api_key_id: string,
            description: string,
            name: string,
            active: string
        },
        webhookUrl: string
    }) {
        const request: HttpRequest = {
            method: HttpMethod.POST,
            url: `${baseUrl}/applications`,
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: auth.access_token,
            },
            body: {
                address: data.webhookUrl,
                triggers: [data.event],
                target: data.target
            }
        }
  
        const response = await httpClient.sendRequest<WebhookInformation>(request);
        return response.body;
    },
  
    // async unsubscribeWebhook(auth: any, webhookId: string) {
    //     const request: HttpRequest = {
    //         method: HttpMethod.DELETE,
    //         url: `${baseUrl}/webhooks/${webhookId}`,
    //         authentication: {
    //             type: AuthenticationType.BEARER_TOKEN,
    //             token: auth.access_token,
    //         }
    //     };
  
    //     const response = await httpClient.sendRequest(request);
    //     return response;
    // }
  }

export const showCommon = {
    async subscribeWebhook(auth: any, data: {
        event: string,
        target: {
            id: string
        },
        webhookUrl: string
    }) {
        const request: HttpRequest = {
            method: HttpMethod.GET,
            url: `${baseUrl}/applications/${data.target.id}`,
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: auth.access_token,
            },
            body: {
                address: data.webhookUrl,
                triggers: [data.event]
            }
        }

        const response = await httpClient.sendRequest<WebhookInformation>(request);
        return response.body;
    },

    // async unsubscribeWebhook(auth: any, webhookId: string) {
    //     const request: HttpRequest = {
    //         method: HttpMethod.DELETE,
    //         url: `${baseUrl}/webhooks/${webhookId}`,
    //         authentication: {
    //             type: AuthenticationType.BEARER_TOKEN,
    //             token: auth.access_token,
    //         }
    //     };

    //     const response = await httpClient.sendRequest(request);
    //     return response;
    // }
}


export const updateCommon = {
    async subscribeWebhook(auth: any, data: {
        event: string,
        target: {
            id: string,
            api_key_id: string,
            description: string,
            name: string,
            active: string
        },
        webhookUrl: string
    }) {
        const request: HttpRequest = {
            method: HttpMethod.PUT,
            url: `${baseUrl}/applications/${data.target.id}`,
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: auth.access_token,
            },
            body: {
                address: data.webhookUrl,
                triggers: [data.event],
                target: data.target
            }
        }

        const response = await httpClient.sendRequest<WebhookInformation>(request);
        return response.body;
    },

    // async unsubscribeWebhook(auth: any, webhookId: string) {
    //     const request: HttpRequest = {
    //         method: HttpMethod.DELETE,
    //         url: `${baseUrl}/webhooks/${webhookId}`,
    //         authentication: {
    //             type: AuthenticationType.BEARER_TOKEN,
    //             token: auth.access_token,
    //         }
    //     };

    //     const response = await httpClient.sendRequest(request);
    //     return response;
    // }
}
