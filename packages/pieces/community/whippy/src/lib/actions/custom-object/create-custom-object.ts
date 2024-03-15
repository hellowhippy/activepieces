/**
Create Custom Objects Action

This action creates a custom objects in Whippy. Key and Label are required.

API Documentation: https://docs.whippy.ai/reference/createcustomobject
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const createCustomObjects = createAction({
    name: 'create_custom_objects',
    auth: appAuth,
    displayName: 'Create Custom Objects',
    description: 'Create Custom Objects',
    props: {
        getCustomProperties: Property.Object({
            displayName: 'Custom Object Properties',
            required: true,
            description: 'The Custom Properties of the Custom Object',
            defaultValue: {
                default: Property.ShortText({
                    displayName: 'Default',
                    required: false,
                }),
                key: Property.ShortText({
                    displayName: 'Custom Property Key',
                    required: true,
                }),
                label: Property.ShortText({
                    displayName: 'Custom Property Label',
                    required: true,
                }),
                required: Property.StaticDropdown({
                    displayName: 'Required',
                    required: false,
                    options: { options: [{ label: 'true', value: 'true' }, { label: 'false', value: 'false' }] }
                }),
                type: Property.StaticDropdown({
                    displayName: 'Type of Custom Property',
                    required: true,
                    options: { options: [{ label: 'text', value: '0' }, { label: 'number', value: '1' },
                                         { label: 'float', value: '2' }, { label: 'boolean', value: '3' },
                                         { label: 'date', value: '4' }, { label: 'list', value: '5' },
                                         { label: 'map', value: '6' }] }
                }),
            },
        }),
        getKey: Property.ShortText({
            displayName: 'Custom Object Key',
            required: true,
        }),
        getLabel: Property.DateTime({
            displayName: 'Custom Object Label',
            required: true,
        }),
    },
    async run(context) {
        const api_key = context.auth;
        const key = context.propsValue['getKey'];
        const label = context.propsValue['getLabel'];
        const custom_properties = context.propsValue['getCustomProperties'];

        try {
            const response = await callAPI({
                url: `custom_objects`,
                method: 'POST',
                api_key: api_key,
                body: {
                    key,
                    label,
                    custom_properties
                },
            })
            if (response?.success) {
                return response?.data; 
            } else {
                console.error(response?.message);
                return response?.message;
            }
        } catch (error) {
            throw new Error(`Failed to create custom object: ${error}`);
        }
    },
});
