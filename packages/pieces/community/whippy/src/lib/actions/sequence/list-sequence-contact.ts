/**
List Sequence Contact Action

This actionLists sequence contacts based on filters.

API Documentation: https://docs.whippy.ai/reference/getsequenceruns
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const listSequenceContact = createAction({
    name: 'list_sequence_contact', 
    auth: appAuth,
    displayName: 'List Sequences Contact',
    description: 'Get a list of sequence contacts based on filters',
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
        getStatus: Property.Dropdown({
            displayName: 'Status',
            description: 'Select Status for sequence contacts',
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
            description: 'Select Respond for sequence contacts',
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
        const api_key = context.auth;
        const id = context.propsValue['getSequenceId'];
        const limit = context.propsValue['getLimit'] || 50;
        const offset = context.propsValue['getOffset'] || 0;
        const status = context.propsValue['getStatus'] || "active";
        const step_ids = context.propsValue['getStepIds'] || "";
        const responded = context.propsValue['getResponded'] || false;
        const unsubscribed = context.propsValue['getUnsubscribed'] || false;
        const clicked_link = context.propsValue['getClickedLink'] || false;

        let params = '';
        if (offset) {
          params += `offset=${offset}`;
        }
        if (limit) {
            params += `&limit=${limit}`;
        }
        if (status) {
            params += `&status=${status}`;
        }
        if (step_ids) {
            params += `&step_ids=${step_ids}`;
        }
        if (responded) {
            params += `&responded=${responded}`;
        }
        if (unsubscribed) {
            params += `&unsubscribed=${unsubscribed}`;
        }
        if (clicked_link) {
            params += `&clicked_link=${clicked_link}`;
        }

        try {
            // Call the generic API function
            const response = await callAPI({
                url: `sequences/${id}/contacts?${params}`,
                method: 'GET',
                api_key: api_key
            })
            if (response?.success) {
                return response?.data; 
            } else {
                console.error(response?.message);
                return response?.message;
            }
        } catch (error) {
            throw new Error(`Failed to list sequence contacts: ${error}`);
        }
    },
});
