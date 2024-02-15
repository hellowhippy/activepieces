/**
List User Channels Action

This action Lists channels (locations) for an organization.

API Documentation: https://docs.whippy.ai/reference/getchannels
*/

import { createAction } from "@activepieces/pieces-framework";
import { Channels } from '../../api/api';
import { appAuth } from "../../../index";


export const listChannels = createAction({
    name: 'list_channels', 
    auth: appAuth,
    displayName: 'List Channels',
    description: 'List channels',
    props: {
        // Properties to ask from the user
    },
    async run(context) {
        const apiKey = context.auth;

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
