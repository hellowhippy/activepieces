/**
Create Custom Object Record Action

This action creates a custom object record in Whippy. custom_object_id, associated_record_id 
and associated_record_type are required.

API Documentation: https://docs.whippy.ai/reference/createcustomobjectrecord
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";

export const createCustomRecord = createAction({
    name: 'create_custom_record',
    auth: PieceAuth.None(),
    displayName: 'Create Custom Record',
    description: 'Create Custom Record',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getCustomId: Property.ShortText({
            displayName: 'Custom Object ID',
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
        const associatedId = context.propsValue['getAssociatedId'];
        const recordType = context.propsValue['getRecordType'];

      try {
          const response = await CustomObject.createCustomRecord(apiKey, customId, associatedId, recordType);
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
