import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";

export const listConversations = createAction({
    name: 'list_conversations',
    auth: PieceAuth.None(),
    displayName: 'List Conversations',
    description: 'Fetch a list of conversations',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getLimit: Property.Number({
            displayName: 'Limit',
            required: false,
        }),
        getUnreadCount: Property.Number({
            displayName: 'Unread Count',
            required: false,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const limit = context.propsValue['getLimit'];
        const unreadCount = context.propsValue['getUnreadCount'];

        // Build the URL with dynamic parameters
        let url = `https://api.whippy.co/v1/conversations`;

        // Create a new URLSearchParams object
        const queryParams = new URLSearchParams();

        // Add dynamic parameters if provided
        if (limit !== undefined) {
            queryParams.set('limit', limit.toString());
        }

        if (unreadCount !== undefined) {
            queryParams.set('unread_count', unreadCount.toString());
        }

        // Append the query parameters to the URL
        if (queryParams.toString() !== '') {
            url += `?${queryParams.toString()}`;
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-WHIPPY-KEY': apiKey,
            },
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
            console.log(responseData);

            // Return the API response
            return responseData;
        } catch (error) {
            console.error(error);
            // You might want to handle errors differently and return a relevant value
            return false;
        }
    },
});
