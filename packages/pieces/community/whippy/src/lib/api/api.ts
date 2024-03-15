export interface APICallParams {
  url: string;
  method: string;
  api_key: string;
  body?: object;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const rootUrl = 'https://api.whippy.co/v1';

export async function callAPI<T>({
  url,
  method,
  api_key,
  body,
}: APICallParams): Promise<ApiResponse<T>> {
  const options = {
    method: method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-WHIPPY-KEY': api_key,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${rootUrl}/${url}`, options);
    const responseData = await response.json();
    return {
      success: true,
      data: responseData as T,
      message: 'API request successful',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: error as T,
      message: 'API request failed',
    };
  }
}