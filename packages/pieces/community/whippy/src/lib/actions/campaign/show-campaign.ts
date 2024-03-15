/**
Show Campaign Action

This action shows a campaign in Whippy. Campaign ID is required.

API Documentation: https://docs.whippy.ai/reference/getcampaign
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

export const showCampaign = createAction({
  name: 'show_campaign',
  auth: appAuth,
  displayName: 'Show Campaign',
  description: 'Show Campaign',
  props: {
    getId: Property.ShortText({
      displayName: 'Campaign ID',
      required: true,
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const id = context.propsValue['getId'];

    try {
      const response = await callAPI({
        url: `campaigns/${id}`,
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
      throw new Error(`Failed to show campaign: ${error}`);
    }
  },
});
