/**
List Campaign Conatcts Action

This action lists campaign contacts in Whippy. Campaign ID is required.

API Documentation: https://docs.whippy.ai/reference/getcampaigncontacts
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { callAPI } from "../../api/api";

export const listCampaignContacts = createAction({
    name: 'list_campaign_contacts',
    auth: appAuth,
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
        getDelivered: Property.Dropdown({
            displayName: 'Delivered',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'True',
                            value: true,
                        },
                        {
                            label : 'False',
                            value : false,
                        }
                    ],
                    defaultValue: false,
                };
            },
            refreshers: []
        }),
        getResponded: Property.Dropdown({
          displayName: 'Responded',
          required: false,
          options: async () => {
            return {
              disabled: false,
              options: [
                {
                  label: 'True',
                  value: true,
                },
                {
                  label : 'False',
                  value : false,
                }
              ],
              defaultValue: false,
            };
          },
          refreshers: []
        }),
        getUnsubscribed: Property.Dropdown({
          displayName: 'Unsubscribed',
          required: false,
          options: async () => {
            return {
              disabled: false,
              options: [
                {
                  label: 'True',
                  value: true,
                },
                {
                  label : 'False',
                  value : false,
                }
              ],
              defaultValue: false,
            };
          },
          refreshers: []
        }),
        getClickedLink: Property.Dropdown({
          displayName: 'Clicked Link',
          required: false,
          options: async () => {
            return {
              disabled: false,
              options: [
                {
                  label: 'True',
                  value: true,
                },
                {
                  label : 'False',
                  value : false,
                }
              ],
              defaultValue: false,
            };
          },
          refreshers: []
        }),
    },
    async run(context) {
        const api_key = context.auth;
        const id = context.propsValue['getId'];
        const limit = context.propsValue['getLimit'] || 50;
        const offset = context.propsValue['getOffset'] || 0;
        const delivered = context.propsValue['getDelivered'] || false;
        const responded = context.propsValue['getResponded'] || false;
        const unsubscribed = context.propsValue['getUnsubscribed']  || false;
        const clicked_level = context.propsValue['getClickedLink']  || false;

      try {
          const response = await callAPI({
            url: `campaigns/${id}/contacts?`,
            method: 'GET',
            api_key: api_key,
            body: {},
            params: {
              limit,
              offset,
              delivered,
              responded,
              unsubscribed,
              clicked_level
            },
          })
          if (response?.success) {
            return response?.data; 
          } else {
            console.error(response?.message);
            return response?.message;
          }
        } catch (error) {
            throw new Error(`Failed to list campaign contacts: ${error}`);
        }
    },
});
