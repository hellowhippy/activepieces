/**
List Sequence Run Action

This action Lists sequence runs based on filters.

API Documentation: https://docs.whippy.ai/reference/getsequenceruns
*/

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Sequence } from "../../api/api";

export const listSequenceRun = createAction({
    name: 'list_sequence_run', 
    auth: PieceAuth.None(),
    displayName: 'List Sequences Run',
    description: 'Get a list of sequence runs based on filters',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
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
            displayName: 'Status',
            description: 'Select Status',
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
        const apiKey = context.propsValue['getAPIKey'];
        const sequenceId = context.propsValue['getSequenceId'];
        const limit = context.propsValue['getLimit'] || 50;
        const offset = context.propsValue['getOffset'] || 0;
        const phone = context.propsValue['getPhone'] || "";
        const status = context.propsValue['getStatus'] || "active" ;
        const channelId = context.propsValue['getChannelId'] || "";
        const before = context.propsValue['getBefore'] || "";
        const after = context.propsValue['getAfter'] || "";

        try {
            const response = await Sequence.listSequenceRuns(apiKey, sequenceId, { limit, offset, phone, status, channelId, before, after });
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
