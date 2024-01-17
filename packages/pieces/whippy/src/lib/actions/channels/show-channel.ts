/**
List User Channels Action

This action Returns information about a specific channel with working hours. Channel ID is required.

API Documentation: https://docs.whippy.ai/reference/getchannel
*/

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Channels } from '../../api/api';

export const showChannels = createAction({
    name: 'show_channels', 
    auth: PieceAuth.None(),
    displayName: 'Show Channels',
    description: 'Show channels',
    props: {
        // Properties to ask from the user
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getChannelId: Property.ShortText({
            displayName: 'Channel ID',
            required: true,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const channelId = context.propsValue['getChannelId'];

        try {
            const response = await Channels.showChannels(apiKey, channelId);
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
