/**
Update Custom Property Value Action

This action updates a custom property value in Whippy. custom_object_id, custom_object_record_id,
custom_property_id and value are required.

API Documentation: https://docs.whippy.ai/reference/updatecustompropertyvalue
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { callAPI } from "../../api/api";

export const updateCustomProperty = createAction({
    name: 'update_custom_property',
    auth: appAuth,
    displayName: 'Update Custom Property',
    description: 'Update Custom Property',
    props: {
        getCustomId: Property.ShortText({
            displayName: 'Custom Object ID',
            required: true,
        }),
        getCustomRecordId: Property.ShortText({
            displayName: 'Custom Object Record ID',
            required: true,
        }),
        getPropertyId: Property.ShortText({
            displayName: 'Custom Property ID',
            required: true,
        }),
        getValue: Property.ShortText({
            displayName: 'Custom Property Value',
            required: true,
        }),
    },
    async run(context) {
        const api_key = context.auth;
        const custom_object_id = context.propsValue['getCustomId'];
        const custom_object_record_id = context.propsValue['getCustomRecordId'];
        const custom_property_id = context.propsValue['getPropertyId'];
        const value = context.propsValue['getValue'];

      try {
          const response = await callAPI({
            url: `custom_objects/${custom_object_id}/records/${custom_object_record_id}/properties/${custom_property_id}`,
            method: 'PUT',
            api_key: api_key,
            body: {
              value
            },
          })
          if (response.success) {
            return response.data; 
          } else {
            console.error(response.message);
            return false;
          }
        } catch (error) {
          throw new Error(`Failed to update custom property: ${error}`);
        }
    },
});
