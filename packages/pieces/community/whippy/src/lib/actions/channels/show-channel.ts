/**
List User Channels Action

This action Returns information about a specific channel with working hours. Channel ID is required.

API Documentation: https://docs.whippy.ai/reference/getchannel
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

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
        const api_key = context.auth;
        const id = context.propsValue['getChannelId'];

        try {
            const response = await callAPI({
                url: `channels/${id}`,
                method: 'GET',
                api_key: api_key,
            })
            if (response?.success) {
                return response?.data; 
            } else {
                console.error(response?.message);
                return response?.message;
            }
        } catch (error) {
            throw new Error(`Failed to show channel: ${error}`);
        }
    },
});
