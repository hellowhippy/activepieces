/**
List User Channels Action

This action Lists channels (locations) for an organization.

API Documentation: https://docs.whippy.ai/reference/getchannels
*/

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Channels } from '../../api/api';

export const listChannels = createAction({
    name: 'list_channels', 
    auth: PieceAuth.None(),
    displayName: 'List Channels',
    description: 'List channels',
    props: {
        // Properties to ask from the user
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];

        try {
            const response = await Channels.listChannels(apiKey);
            if (response.success) {
                return response.data; 
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },
});
