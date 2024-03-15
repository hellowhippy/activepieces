/**
List User Channels Action

This action Returns a list of Users in given Organization with access to the Channel(Location). Channel ID is required.

API Documentation: https://docs.whippy.ai/reference/listuserchannels-1
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

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
        const api_key = context.auth;
        const id = context.propsValue['getChannelId'];
        const offset = context.propsValue['getOffset'] || 1;
        const limit = context.propsValue['getLimit'] || 50;

        let params = `offset=${offset}`;

        if (limit) {
        params += `&limit=${limit}`;
        }

        try {
            const response = await callAPI({
                url: `channels/${id}/users?${params}`,
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
            throw new Error(`Failed to list user channels: ${error}`);
        }
    },
});
