import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

export const createNote = createAction({
	name: 'create_note', 
  auth: PieceAuth.None(),
  displayName:'Create Note',
  description: 'Create Note',
	props: {
        // Properties to ask from the user, in this ask we will take number of
		getAPIKey: Property.ShortText({
			displayName: 'API Key',
			required: true,
		}),
        getNote: Property.LongText({
			displayName: 'Create Note',
			required: false,
		}),
        getToNumber: Property.ShortText({
			displayName: 'Destination Number',
			required: true,
		}),
        
	},
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const note = context.propsValue['getNote'];
        const phoneNumber = context.propsValue['getToNumber'];

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-WHIPPY-KEY': apiKey,
            },
            body: JSON.stringify({ from: '+12133381105', to: phoneNumber, body: note }),
        };

        try {
            const response = await fetch('https://api.whippy.co/v1/messaging/note', options);
            const responseData = await response.json();
            console.log(responseData);

            // Return the API response
            return responseData;
        } catch (error) {
            console.error(error);
            // Return an error status
            return false;
        }
    },
});
