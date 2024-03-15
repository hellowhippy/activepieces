/**
Create Custom Object Record Action

This action creates a custom object record in Whippy. custom_object_id, associated_record_id 
and associated_record_type are required.

API Documentation: https://docs.whippy.ai/reference/createcustomobjectrecord
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const createCustomRecord = createAction({
  name: 'create_custom_record',
  auth: appAuth,
  displayName: 'Create Custom Record',
  description: 'Create Custom Record',
  props: {
    getCustomId: Property.ShortText({
      displayName: 'Custom Object ID',
      required: true,
    }),
    getAssociatedId: Property.ShortText({
      displayName: 'Associated Record ID',
      required: false,
    }),
    getRecordType: Property.StaticDropdown({
      displayName: 'Type of Associated Record',
      required: false,
      options: { 
        options: [
          { label: 'contact', value: '0' }, { label: 'conversation', value: '1' },
          { label: 'message', value: '2' }, { label: 'tag', value: '3' },
          { label: 'contact_tag', value: '4' }, { label: 'campaign_contact', value: '5' },
          { label: 'step_contact', value: '6' }
        ] 
      }
    }),
    getExternalId: Property.ShortText({
      displayName: 'External ID',
      description: 'A unique ID that can be used to identify the CustomObjectRecord when doing upserts',
      required: false,
    }),
    getProperties: Property.Object({
      displayName: 'Properties',
      description: 'The CustomProperties of the CustomObjectRecord',
      required: false,
      defaultValue: {
        data: Property.Json({
          displayName: '',
          required: false,
          defaultValue: {"key": "value"}
        })
      }
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const custom_object_id = context.propsValue['getCustomId'];
    const associated_record_id = context.propsValue['getAssociatedId'];
    const associated_record_type = context.propsValue['getRecordType'];
    const external_id = context.propsValue['getExternalId'];
    const properties = context.propsValue['getProperties'];

    try {
      const response = await callAPI({
        url: `custom_objects/${custom_object_id}/records`,
        method: 'POST',
        api_key: api_key,
        body: {
          associated_record_id,
          associated_record_type,
          external_id,
          properties
        },
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to create custom record: ${error}`);
    }
  },
});
