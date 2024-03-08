/**
List Campaign Action

This action lists campaigns in Whippy.

API Documentation: https://docs.whippy.ai/reference/getcampaigns
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { callAPI } from "../../api/api";

export const listCampaigns = createAction({
    name: 'list_campaigns',
    auth: appAuth,
    displayName: 'List Campaigns',
    description: 'List Campaigns',
    props: {
      getLimit: Property.Number({
          displayName: 'Limit',
          required: false,
      }),
      getOffset: Property.Number({
          displayName: 'Offset',
          required: false,
      }),
      getTitle: Property.ShortText({
          displayName: 'Title',
          required: false,
      }),
      getStatus: Property.Array({
        displayName: 'Statuses',
        required: false,
      }),
      getChannelsId: Property.Array({
        displayName: 'Channels [ID]',
        required: false,
      }),
      getChannelsPhone: Property.Array({
          displayName: 'Channels [Phone]',
          required: false,
      }),
      getCreatedBy: Property.Array({
          displayName: 'Created by User ID',
          required: false,
      }),
      getUpdatedBy: Property.Array({
          displayName: 'Updated By User IDs',
          required: false,
      }),
    },
    async run(context) {
      const api_key = context.auth;
      const limit = context.propsValue['getLimit'];
      const offset = context.propsValue['getOffset'];
      const title = context.propsValue['getTitle'];
      const status = context.propsValue['getStatus'];
      const channelsId= context.propsValue['getChannelsId'];
      const channelPhone = context.propsValue['getChannelsPhone'];
      const created_by = context.propsValue['getCreatedBy'];
      const updated_by = context.propsValue['getUpdatedBy'];

      try {
          const response = await callAPI({
            url: "campaigns",
            method: 'GET',
            api_key: api_key,
            body :{},
            params: {
              limit,
              offset,
              title,
              status: [status],
              'channels[][id]': [channelsId],
              'channels[][phone]': [channelPhone],
              created_by: [created_by],
              updated_by: [updated_by]
            },
          })
          if (response?.success) {
            return response?.data; 
          } else {
            console.error(response?.message);
            return response?.message;
          }
        } catch (error) {
          throw new Error(`Failed to list campaign: ${error}`);
        }
    },
});
