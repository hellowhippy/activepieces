/**
Create Custom Property Action

This action creates a custom property in Whippy. Custom_object_id, Key, type and Label are required.

API Documentation: https://docs.whippy.ai/reference/createcustomproperty
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";

export const createCustomProperty = createAction({
    name: 'create_custom_property',
    auth: PieceAuth.None(),
    displayName: 'Create Custom Property',
    description: 'Create Custom Property',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getCustomId: Property.ShortText({
            displayName: 'Custom Object ID',
            required: true,
        }),
        getDefault: Property.ShortText({
            displayName: 'Default Value',
            required: false,
        }),
        getKey: Property.ShortText({
            displayName: 'Custom Property Key',
            required: true,
        }),
        getLabel: Property.ShortText({
            displayName: 'Custom Property Label',
            required: true,
        }),
        getRequired: Property.StaticDropdown({
            displayName: 'Required',
            required: false,
            options: { options: [{ label: 'true', value: 'true' }, { label: 'false', value: 'false' }] }
        }),
        getType: Property.StaticDropdown({
            displayName: 'Type of Custom Property',
            required: true,
            options: { options: [{ label: 'text', value: '0' }, { label: 'number', value: '1' },
                                    { label: 'float', value: '2' }, { label: 'boolean', value: '3' },
                                    { label: 'date', value: '4' }, { label: 'list', value: '5' },
                                    { label: 'map', value: '6' }] }
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const customId = context.propsValue['getCustomId'];
        const cusDefault = context.propsValue['getDefault'];
        const label = context.propsValue['getLabel'];
        const required = context.propsValue['getRequired'];
        const type = context.propsValue['getType'];
        const key = context.propsValue['getKey']

      try {
          const response = await CustomObject.createCustomProperty(apiKey, customId, key, label, required, type, cusDefault);
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
