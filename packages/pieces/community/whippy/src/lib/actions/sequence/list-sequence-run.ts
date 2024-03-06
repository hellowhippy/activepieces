/**
List Sequence Run Action

This action Lists sequence runs based on filters.

API Documentation: https://docs.whippy.ai/reference/getsequenceruns
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { callAPI } from "../../api/api";

export const listSequenceRun = createAction({
    name: 'list_sequence_run', 
    auth: appAuth,
    displayName: 'List Sequences Run',
    description: 'Get a list of sequence runs based on filters',
    props: {
        getSequenceId: Property.ShortText({
            displayName: 'Sequence ID',
            required: true,
        }),
        getLimit: Property.Number({
            displayName: 'Limit',
            required: false,
        }),
        getOffset: Property.Number({
            displayName: 'Offset',
            required: false,
        }),
        getPhone: Property.ShortText({
            displayName: 'Phone',
            required: false,
        }),
        getStatus: Property.Dropdown({
            displayName: 'Select Status',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'Active',
                            value: 'active',
                        },
                        {
                            label: 'Finished',
                            value: 'finished',
                        },
                    ],
                    defaultValue: 'active',
                };
            },
            refreshers: []
        }),
        getChannelId: Property.ShortText({
            displayName: 'Channel ID',
            required: false,
        }),
        getBefore: Property.DateTime({
            displayName: 'Before Date',
            required: false,
        }),
        getAfter: Property.DateTime({
            displayName: 'After Date',
            required: false,
        }),
    },
    async run(context) {
        const apiKey = context.auth;
        const id = context.propsValue['getSequenceId'];
        const limit = context.propsValue['getLimit'] || 50;
        const offset = context.propsValue['getOffset'] || 0;
        const phone = context.propsValue['getPhone'] || "";
        const status = context.propsValue['getStatus'] || "active" ;
        const channel_id = context.propsValue['getChannelId'] || "";
        const before = context.propsValue['getBefore'] || "";
        const after = context.propsValue['getAfter'] || "";

        try {
            const response = await callAPI({
                url: `sequences/${id}/sequence_runs`,
                method: 'GET',
                apiKey: apiKey,
                body : {},
                params: {
                    limit,
                    offset,
                    status,
                    phone,
                    before,
                    after,
                    channel_id
                }
            })
            if (response?.success) {
                return response?.data; 
            } else {
                console.error(response?.message);
                return response?.message;
            }
        } catch (error) {
            throw new Error(`Failed to list sequence run: ${error}`);
        }
    },
});
