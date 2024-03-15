/**
  Create Contact Action
  This action creates a contact in Whippy. Phone number is required. 
  API Documentation: https://docs.whippy.ai/reference/createcontact-1
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { callAPI } from '../../api/api';
import { appAuth } from '../../..';

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
    getPhone: Property.ShortText({
			displayName: 'Contact Phone Number',
			required: true,
		}),
    getOptChannel: Property.StaticDropdown({
      displayName: 'opt_in_to_all_channels',
      description: 'Setting to opt in contact to all channels',
      required: false,
      options: {
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
      },
    }),
	},
	async run(context) {
    const api_key = context.auth;
    const email = context.propsValue['getEmail'];
    const name = context.propsValue['getName'];
    const phone = context.propsValue['getPhone'];
    const opt_in_to_all_channels = context.propsValue['getOptChannel'];

    try {
      const response = await callAPI({
        url: `contacts`,
        method: 'POST',
        api_key: api_key,
        body: {
          email,
          name,
          phone,
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
