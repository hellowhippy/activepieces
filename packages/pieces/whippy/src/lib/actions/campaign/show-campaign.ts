/**
Show Campaign Action

This action shows a campaign in Whippy. Campaign ID is required.

API Documentation: https://docs.whippy.ai/reference/getcampaign
*/

import { createAction, Property} from "@activepieces/pieces-framework";
import { Campaign } from "../../api/api";
import { appAuth } from "../../../index";


export const showCampaign = createAction({
    name: 'show_campaign',
    auth: appAuth,
    displayName: 'Show Campaign',
    description: 'Show Campaign',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getId: Property.ShortText({
            displayName: 'Campaign ID',
            required: true,
        }),
    },
    async run(context) {
      const apiKey = context.auth;
      const campaignID = context.propsValue['getId'];

      try {
          const response = await Campaign.showCampaign(apiKey, campaignID);
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
