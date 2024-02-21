/**
List Campaign Action

This action lists campaigns in Whippy.

API Documentation: https://docs.whippy.ai/reference/getcampaigns
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Campaign } from "../../api/api";

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
        description: 'channel IDs',
        required: false,
      }),
      getChannelsPhone: Property.Array({
          displayName: 'Channels [Phone]',
          description: 'channel phones',
          required: false,
      }),
      getCreatedBy: Property.Array({
          displayName: 'Created by',
          description: 'Created by user IDs',
          required: false,
      }),
      getUpdatedBy: Property.Array({
          displayName: 'Updated By',
          description: 'Updated by user IDs',
          required: false,
      }),
    },
    async run(context) {
      const apiKey = context.auth;
      const limit = context.propsValue['getLimit'];
      const offset = context.propsValue['getOffset'];
      const title = context.propsValue['getTitle'];
      const status = context.propsValue['getStatus'];
      const channelID = context.propsValue['getChannelsId'];
      const channelPhone = context.propsValue['getChannelsPhone'];
      const createdBy = context.propsValue['getCreatedBy'];
      const updatedBy = context.propsValue['getUpdatedBy'];

      try {
          const response = await Campaign.listCampaigns(apiKey, limit, offset, title, status, channelID,
            channelPhone, createdBy, updatedBy);
          if (response.success) {
            return response.data; 
          } else {
            console.error(response.message);
            return false;
          }
        } catch (error) {
          throw new Error(`Failed to list campaign: ${error}`);
        }
    },
});
