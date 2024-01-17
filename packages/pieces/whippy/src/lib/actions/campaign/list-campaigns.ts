/**
List Campaign Action

This action lists campaigns in Whippy.

API Documentation: https://docs.whippy.ai/reference/getcampaigns
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Campaign } from "../../api/api";

export const listCampaigns = createAction({
    name: 'list_campaigns',
    auth: PieceAuth.None(),
    displayName: 'List Campaigns',
    description: 'List Campaigns',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
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
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const limit = context.propsValue['getLimit'] || 50 ;
        const offset = context.propsValue['getOffset'] || 0;
        const title = context.propsValue['getTitle'] || "";

      try {
          const response = await Campaign.listCampaigns(apiKey, limit, offset, title);
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
