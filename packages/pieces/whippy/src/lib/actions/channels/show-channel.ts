/**
List User Channels Action

This action Returns information about a specific channel with working hours. Channel ID is required.

API Documentation: https://docs.whippy.ai/reference/getchannel
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Channels } from "../../api/api";

export const showChannels = createAction({
    name: 'show_channels', 
    auth: appAuth,
    displayName: 'Show Channels',
    description: 'Show channels',
    props: {
        getChannelId: Property.ShortText({
            displayName: 'Channel ID',
            required: true,
        }),
    },
    async run(context) {
        const apiKey = context.auth;
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
            throw new Error(`Failed to show channel: ${error}`);
        }
    },
});
