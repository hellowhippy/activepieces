/**
List Campaign Conatcts Action

This action lists campaign contacts in Whippy. Campaign ID is required.

API Documentation: https://docs.whippy.ai/reference/getcampaigncontacts
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Campaign } from "../../api/api";

export const listCampaignContacts = createAction({
    name: 'list_campaign_contacts',
    auth: PieceAuth.None(),
    displayName: 'List Campaign Contacts',
    description: 'List Campaign Contacts',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getId: Property.ShortText({
            displayName: 'Campaign ID',
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
        getDelivered: Property.StaticDropdown({
            displayName: 'Delivered',
            required: false,
            options: { options: [{ label: 'true', value: '1' }, { label: 'false', value: '0' }] }
        }),
        getResponded: Property.StaticDropdown({
            displayName: 'Responded',
            required: false,
            options: { options: [{ label: 'true', value: '1' }, { label: 'false', value: '0' }] }
        }),
        getUnsubscribed: Property.StaticDropdown({
            displayName: 'Unsubscribed',
            required: false,
            options: { options: [{ label: 'true', value: '1' }, { label: 'false', value: '0' }] }
        }),
        getClickedLink: Property.StaticDropdown({
            displayName: 'Clicked Link',
            required: false,
            options: { options: [{ label: 'true', value: '1' }, { label: 'false', value: '0' }] }
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const campaignID = context.propsValue['getId'];
        const limit = context.propsValue['getLimit'];
        const offset = context.propsValue['getOffset'];
        const delivered = context.propsValue['getDelivered'];
        const responded = context.propsValue['getResponded'];
        const unsubscribed = context.propsValue['getUnsubscribed'];
        const clickedLink = context.propsValue['getClickedLink'];

      try {
          const response = await Campaign.listCampaignContacts(apiKey, campaignID, limit, offset, delivered, responded, unsubscribed, clickedLink);
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
