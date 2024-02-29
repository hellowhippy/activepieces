/**
List User Channels Action

This action Lists channels (locations) for an organization.

API Documentation: https://docs.whippy.ai/reference/getchannels
*/

import { createAction } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Channels } from "../../api/api";

export const listChannels = createAction({
    name: 'list_channels', 
    auth: appAuth,
    displayName: 'List Channels',
    description: 'List channels',
    props: {
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
            throw new Error(`Failed to list channels : ${error}`);
        }
    },
});
