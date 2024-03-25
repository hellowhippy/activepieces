/**
List Custom Objects Action

This action lists a custom objects in Whippy.

API Documentation: https://docs.whippy.ai/reference/listcustomobjects
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const listCustomObjects = createAction({
  name: 'list_custom_objects',
  auth: appAuth,
  displayName: 'List Custom Objects',
  description: 'List Custom Objects',
  props: {
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
    const limit = context.propsValue['getLimit'];
    const offset = context.propsValue['getOffset'];

    let params = '';
    if (offset) {
      params += `offset=${offset}`;
    }
    if (limit) {
      params += `&limit=${limit}`;
    }

    try {
      const response = await callAPI({
        url: `custom_objects?${params}`,
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
      throw new Error(`Failed to list custom objects: ${error}`);
    }
  },
});
