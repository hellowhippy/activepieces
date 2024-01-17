/**
Update Custom Object Record Action

This action updates a custom object record in Whippy. custom_object_id, custom_object_record_id,
associated_record_id and associated_record_type are required.

API Documentation: https://docs.whippy.ai/reference/updatecustomobjectrecord
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";

export const updateCustomObject = createAction({
    name: 'update_custom_object',
    auth: PieceAuth.None(),
    displayName: 'Update Custom Object',
    description: 'Update Custom Object',
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
        getAssociatedId: Property.ShortText({
            displayName: 'Associated Record ID',
            required: true,
        }),
        getRecordType: Property.StaticDropdown({
            displayName: 'Type of Associated Record',
            required: true,
            options: { options: [{ label: 'contact', value: '0' }, { label: 'conversation', value: '1' },
                                { label: 'message', value: '2' }, { label: 'tag', value: '3' },
                                { label: 'contact_tag', value: '4' }, { label: 'campaign_contact', value: '5' },
                                { label: 'step_contact', value: '6' }] } 
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const customId = context.propsValue['getCustomId'];
        const recordId = context.propsValue['getCustomRecordId'];
        const associatedId = context.propsValue['getAssociatedId'];
        const recordType = context.propsValue['getRecordType'];

      try {
          const response = await CustomObject.updateCustomObject(apiKey, customId, recordId, associatedId, recordType);
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
