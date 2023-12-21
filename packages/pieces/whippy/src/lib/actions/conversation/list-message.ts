import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";

export const listMessage = createAction({
    name: 'list_message',
    auth: PieceAuth.None(),
    displayName: 'List Message',
    description: 'Fetch a message details',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getConversationId: Property.ShortText({
            displayName: 'Conversation ID',
            required: true,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const conversationId = context.propsValue['getConversationId'];
        const limit = 10;
        const offset = 0;

        const url = `https://api.whippy.co/v1/conversations/${conversationId}?messages[limit]=${limit}&messages[offset]=${offset}`;

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

            return responseData;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
});
