/**
Show Organization Action

This action shows a organization in Whippy.

API Documentation: https://docs.whippy.ai/reference/getorganization
*/

import { createAction } from '@activepieces/pieces-framework';
import { callAPI } from '../../api/api';
import { appAuth } from '../../..';

export const showOrganization = createAction({
  name: 'show_organization',
  auth: appAuth,
  displayName: 'Show Organization',
  description: 'Show Organization',
  props: {
  },
  async run(context) {
    const api_key = context.auth;

    try {
      const response  = await callAPI({
        url: `organization`,
        method: 'GET',
        api_key: api_key,
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to show organization: ${error}`);
    }
  },
});
