/**
List Custom Object Records Action

This action lists a custom object records in Whippy.

API Documentation: https://docs.whippy.ai/reference/listcustomobjectrecords
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const listCustomObjectRecords = createAction({
    name: 'list_custom_object_records',
    auth: appAuth,
    displayName: 'List Custom Object Records',
    description: 'List Custom Object Records',
    props: {
        getCusId: Property.ShortText({
            displayName: 'Custom ID',
            required: true,
        }),
        getAssociatedId: Property.ShortText({
            displayName: 'Associated Resource ID',
            required: false,
        }),
        getResourceType: Property.ShortText({
            displayName: 'Associated Resource Type',
            required: false,
        }),
        getLimit: Property.Number({
            displayName: 'Limit',
            required: false,
        }),
        getOffset: Property.Number({
            displayName: 'Offset',
            required: false,
        }),
    },
    async run(context) {
        const api_key = context.auth;
        const custom_object_id = context.propsValue['getCusId'];
        const limit = context.propsValue['getLimit'];
        const offset = context.propsValue['getOffset'];
        const associated_resource_id = context.propsValue['getAssociatedId'];
        const associated_resource_type = context.propsValue['getResourceType'];

        let params = `offset=${offset}`;
        if (limit) {
            params += `&limit=${limit}`;
        }
        if (associated_resource_id) {
            params += `&associated_resource_id=${associated_resource_id}`;
        }
        if (associated_resource_type) {
            params += `&associated_resource_type=${associated_resource_type}`;
        }

        try {
            const response = await callAPI({
                url: `custom_objects/${custom_object_id}?${params}`,
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
            throw new Error(`Failed to list custom records: ${error}`);
        }
    },
});
