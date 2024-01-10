// api.ts
export interface APICallParams {
    url: string;
    method: string;
    apiKey: string;
    body: object;
}

// Define a generic ApiResponse interface
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

const rootUrl: string = 'https://api.whippy.co/v1';

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
            data: responseData as T, // Type assertion here
            message: 'API request successful',
        };
    } catch (error) {
        console.error(error);
        // Return an ApiResponse with success: false and an error message
        return {
            success: false,
            data: error as T, // Type assertion here
            message: 'API request failed',
        };
    }
}

// Message class
export class Message {
    static async sendMessage(apiKey: string, from: string, to: string, message: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/messaging/sms`,
            method: 'POST',
            apiKey: apiKey,
            body: { from: from, to: to, body: message },
        };

        // Call the generic API function
        return await callAPI(apiParams);
    }
}

// Note class
export class Note {
    static async createNote(apiKey: string,from: string, note: string, phoneNumber: string): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/messaging/note`,
            method: 'POST',
            apiKey: apiKey,
            body: { from: from, to: phoneNumber, body: note },
        };

        // Call the generic API function
        return await callAPI(apiParams);
    }
}

// Contact class
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

        // Call the generic API function
        return await callAPI(apiParams);
    }

    static async listContacts(apiKey: string, email: string | undefined, name: string | undefined, phone: string | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/contacts?limit=50&offset=0`,
            method: 'GET',
            apiKey: apiKey,
            body: {
                phone: phone,
                email: email,
                name: name,
            },
        };

        // Call the generic API function
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

        // Call the generic API function
        return await callAPI(apiParams);
    }
}

// Conversation class
export class Conversation {
    static async listConversations(apiKey: string, limit: number | undefined, unreadCount: number | undefined): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/conversations?limit=${limit}&unread_count=${unreadCount}`,
            method: 'GET',
            apiKey: apiKey,
            body: {
                unreadCount: unreadCount,
                limit: limit,
            },
        };

        // Call the generic API function
        return await callAPI(apiParams);
    }

    static async listMessages(apiKey: string, conversationId: string , limit: number, offset: number): Promise<ApiResponse<any>> {
        const apiParams: APICallParams = {
            url: `${rootUrl}/conversations/${conversationId}?messages[limit]=${limit}&messages[offset]=${offset}`,
            method: 'GET',
            apiKey: apiKey,
            body: {
            },
        };

        // Call the generic API function
        return await callAPI(apiParams);
    }
}