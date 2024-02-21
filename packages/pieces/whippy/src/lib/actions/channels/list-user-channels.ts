/**
List User Channels Action

This action Returns a list of Users in given Organization with access to the Channel(Location). Channel ID is required.

API Documentation: https://docs.whippy.ai/reference/listuserchannels-1
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Channels } from "../../api/api";

export const listUserChannels = createAction({
    name: 'list_user_channels', 
    auth: appAuth,
    displayName: 'List User Channels',
    description: 'List channels for a user',
    props: {
        getChannelId: Property.ShortText({
            displayName: 'Channel ID',
            required: true,
        }),
        getOffset: Property.Number({
            displayName: 'Offset',
            required: false,
        }),
        getLimit: Property.Number({
            displayName: 'Limit',
            required: false,
        }),
    },
    async run(context) {
        const apiKey = context.auth;
        const channelId = context.propsValue['getChannelId'];
        const offset = context.propsValue['getOffset'];
        const limit = context.propsValue['getLimit'];

        try {
            const response = await Channels.listUserChannels(apiKey, channelId, offset || 1, limit || 50);
            if (response.success) {
                return response.data; 
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            throw new Error(`Failed to list user channels: ${error}`);
        }
    },
});
