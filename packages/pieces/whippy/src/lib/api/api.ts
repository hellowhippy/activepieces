export interface APICallParams {
    url: string;
    method: string;
    apiKey: string;
    body: object;
}

export async function callAPI({ url, method, apiKey, body }: APICallParams): Promise<any> {
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
        // Return the API response
        return responseData;
    } catch (error) {
        console.error(error);
        // Return an error status or handle it as needed
        return false;
    }
}