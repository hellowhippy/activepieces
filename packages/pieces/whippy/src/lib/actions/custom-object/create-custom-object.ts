/**
Create Custom Objects Action

This action creates a custom objects in Whippy. Key and Label are required.

API Documentation: https://docs.whippy.ai/reference/createcustomobject
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";

export const createCustomObjects = createAction({
    name: 'create_custom_objects',
    auth: PieceAuth.None(),
    displayName: 'Create Custom Objects',
    description: 'Create Custom Objects',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getCustomProperties: Property.Object({
            displayName: 'Custom Object Properties',
            required: true,
            description: 'The Custom Properties of the Custom Object',
            defaultValue: {
                default: "",
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
                // type: Property.StaticDropdown({
                //     displayName: 'Type of Custom Property',
                //     required: false,
                //     options: { options: [{ label: 'text', value: '0' }, { label: 'number', value: '1' },
                //                          { label: 'float', value: '2' }, { label: 'boolean', value: '3' },
                //                          { label: 'date', value: '4' }, { label: 'list', value: '5' },
                //                          { label: 'map', value: '6' }] }
                // }),
                type: Property.Dropdown({
                    displayName: 'Type of Custom Property',
                    // description: 'Select ClickedLink',
                    required: false,
                    options: async () => {
                        return {
                            disabled: false,
                            options: [
                                { label: 'text', value: '0' }, { label: 'number', value: '1' },
                                                         { label: 'float', value: '2' }, { label: 'boolean', value: '3' },
                                                         { label: 'date', value: '4' }, { label: 'list', value: '5' },
                                                         { label: 'map', value: '6' }
                            ],
                            defaultValue: false,
                        };
                    },
                    refreshers: []
                }),
            },
        }),
        getKey: Property.ShortText({
            displayName: 'Custom Object Key',
            required: true,
        }), 
        getLabel: Property.ShortText({
            displayName: 'Custom Object Label',
            required: true,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const key = context.propsValue['getKey'];
        const label = context.propsValue['getLabel'];
        const customProperties = context.propsValue['getCustomProperties'];

      try {
          const response = await CustomObject.createCustomObjects(apiKey, key, label, customProperties);
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
