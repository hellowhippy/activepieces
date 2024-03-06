/**
Create Contact Action

This action creates a contact in Whippy. Phone number is required. 

API Documentation: https://docs.whippy.ai/reference/createcontact-1
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";

export const createContact = createAction({
	name: 'create_contact', 
  auth: appAuth,
  displayName:'Create Contact',
  description: 'Create Contact',
	props: {
    getEmail: Property.ShortText({
			displayName: 'Contact Email Address',
			required: false,
		}),
    getName: Property.ShortText({
			displayName: 'Contact Name',
			required: false,
		}), 
    getPhone: Property.Number({
			displayName: 'Contact Phone Number',
			required: true,
		}),
    getOptTo: Property.Array({
      displayName: 'opt_in_to',
      description: 'Setting to opt in contact to specific channels',
      required: false
    }),
    getOptChannel: Property.Dropdown({
      displayName: 'opt_in_to_all_channels',
      description: 'Setting to opt in contact to all channels',
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
    const apiKey = context.auth;
    const email = context.propsValue['getEmail'];
    const name = context.propsValue['getName'];
    const phone = context.propsValue['getPhone'];
    const opt_in_to = context.propsValue['getOptTo'];
    const opt_in_to_all_channels = context.propsValue['getOptChannel'];

    try {
      const response = await await callAPI({
        url: "contacts",
        method: 'POST',
        apiKey: apiKey,
        body: {
          email,
          name,
          phone,
          opt_in_to: opt_in_to,
          opt_in_to_all_channels
        },
      })
      if (response?.success) {
          return response?.data; 
        } else {
          console.error(response?.message);
          return response?.message;
         }
      } catch (error) {
        throw new Error(`Failed to create contact: ${error}`);
      }
    },
});
