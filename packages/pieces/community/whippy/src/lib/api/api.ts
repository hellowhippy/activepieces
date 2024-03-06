export interface APICallParams {
  url: string;
  method: string;
  apiKey: string;
  body?: object;
  params?: object;
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
  apiKey,
  body,
  params,
}: APICallParams): Promise<ApiResponse<T>> {
  let apiUrl = `${rootUrl}/${url}`;

  if (params) {
    const queryParams = new URLSearchParams();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const paramValue = (params as Record<string, string | string[]>)[key];
        if (Array.isArray(paramValue)) {
          paramValue.forEach((value) => {
            queryParams.append(key, value);
          });
        } else {
          queryParams.append(key, paramValue as string);
        }
      }
    }
    apiUrl += `?${queryParams.toString()}`;
  }

  const options = {
    method: method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-WHIPPY-KEY': apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(apiUrl, options);
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