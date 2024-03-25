/**
Get Sequence Action

This action Lists sequences for an organization based on filters.

API Documentation: https://docs.whippy.ai/reference/getsequences
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const getSequences = createAction({
  name: 'get_sequences', 
  auth: appAuth,
  displayName: 'Get Sequences',
  description: 'Get Sequences',
  props: {
    limit: Property.Number({
      displayName: 'Limit',
      required: false,
      defaultValue: 50, // You can adjust the default value
    }),
    offset: Property.Number({
      displayName: 'Offset',
      required: false,
      defaultValue: 0, // You can adjust the default value
    }),
    title: Property.ShortText({
      displayName: 'Title',
      required: false,
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const limit = context.propsValue['limit'] || 50;
    const offset = context.propsValue['offset'] || 0;
    const title = context.propsValue['title'] || "";

    let params = '';
    if (offset) {
      params += `offset=${offset}`;
    }
    if (limit) {
      params += `&limit=${limit}`;
    }
    if (title) {
      params += `&title=${title}`;
    }
    try {
      const response =  await callAPI({
        url: `sequences?${params}`,
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
      throw new Error(`Failed to get sequences: ${error}`);
    }
  },
});
