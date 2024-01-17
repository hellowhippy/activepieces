/**
Update Custom Property Value Action

This action updates a custom property value in Whippy. custom_object_id, custom_object_record_id,
custom_property_id and value are required.

API Documentation: https://docs.whippy.ai/reference/updatecustompropertyvalue
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";

export const updateCustomProperty = createAction({
    name: 'update_custom_property',
    auth: PieceAuth.None(),
    displayName: 'Update Custom Property',
    description: 'Update Custom Property',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
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
        const apiKey = context.propsValue['getAPIKey'];
        const customId = context.propsValue['getCustomId'];
        const recordId = context.propsValue['getCustomRecordId'];
        const propertyId = context.propsValue['getPropertyId'];
        const value = context.propsValue['getValue'];

      try {
          const response = await CustomObject.updateCustomProperty(apiKey, customId, recordId, propertyId, value);
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
