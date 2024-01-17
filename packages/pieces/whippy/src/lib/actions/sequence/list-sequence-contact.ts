/**
List Sequence Contact Action

This actionLists sequence contacts based on filters.

API Documentation: https://docs.whippy.ai/reference/getsequenceruns
*/

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Sequence } from "../../api/api";
import { BooleanInput } from '@angular/cdk/coercion';

export const listSequenceContact = createAction({
    name: 'list_sequence_contact', 
    auth: PieceAuth.None(),
    displayName: 'List Sequences Contact',
    description: 'Get a list of sequence contacts based on filters',
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
                            label: 'Pending',
                            value: 'pending',
                        },
                        {
                            label: 'In Active',
                            value: 'in-active',
                        },
                        {
                            label: 'Moved',
                            value: 'moved',
                        },
                        {
                            label: 'Complete',
                            value: 'complete',
                        },
                        {
                            label: 'Removed',
                            value: 'removed',
                        },
                    ],
                    defaultValue: 'active',
                };
            },
            refreshers: []
        }),
        getStepIds: Property.LongText({
            displayName: 'Step IDs',
            required: false,
        }),
        getResponded: Property.Dropdown({
            displayName: 'Responded',
            description: 'Select Respond',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'True',
                            value: true,
                        },
                        {
                            label : 'False',
                            value : false,
                        }
                    ],
                    defaultValue: false,
                };
            },
            refreshers: []
        }),
        getUnsubscribed: Property.Dropdown({
            displayName: 'Unsubscribed',
            description: 'Select Unsubscribed',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'True',
                            value: true,
                        },
                        {
                            label : 'False',
                            value : false,
                        }
                    ],
                    defaultValue: false,
                };
            },
            refreshers: []
        }),
        getClickedLink: Property.Dropdown({
            displayName: 'ClickedLink',
            description: 'Select ClickedLink',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'True',
                            value : true,
                        },
                        {
                            label : 'False',
                            value : false,
                        }
                    ],
                    defaultValue: false,
                };
            },
            refreshers: []
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const sequenceId = context.propsValue['getSequenceId'];
        const limit = context.propsValue['getLimit'] || 50;
        const offset = context.propsValue['getOffset'] || 0;
        const status = context.propsValue['getStatus'] || "active";
        const stepIds = context.propsValue['getStepIds'] || "";
        const responded = context.propsValue['getResponded'] || false;
        const unsubscribed = context.propsValue['getUnsubscribed'] || false;
        const clickedLink = context.propsValue['getClickedLink'] || false;

        try {
            // Call the generic API function
            const response = await Sequence.listSequenceContacts(apiKey, sequenceId, { limit, offset, status, stepIds, responded, unsubscribed, clickedLink });
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
