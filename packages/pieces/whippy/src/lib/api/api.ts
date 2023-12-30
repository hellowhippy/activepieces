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
