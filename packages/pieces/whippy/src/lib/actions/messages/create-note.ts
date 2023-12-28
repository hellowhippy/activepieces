import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";
import { APICallParams, callAPI } from "../../api/api";

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

        const apiParams : APICallParams = {
            url: 'https://api.whippy.co/v1/messaging/note',
            method: 'POST',
            apiKey: apiKey,
            body: { from: '+12133381105', to: phoneNumber, body: note },
        };

        // Call the generic API function
        const response = await callAPI(apiParams);
        // Return the API response
        return response;
    },
});
