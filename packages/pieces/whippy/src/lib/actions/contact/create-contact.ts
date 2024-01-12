/**
Create Contact Action

This action creates a contact in Whippy. Phone number is required. 

API Documentation: https://docs.whippy.ai/reference/createcontact-1
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Contact } from '../../api/api';

export const createContact = createAction({
	name: 'create_contact', 
  auth: PieceAuth.None(),
  displayName:'Create Contact',
  description: 'Create Contact',
	props: {
        // Properties to ask from the user
		getAPIKey: Property.ShortText({
			displayName: 'API Key',
			required: true,
		}),
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
	},
	async run(context) {
      const apiKey = context.propsValue['getAPIKey'];
      const email = context.propsValue['getEmail'];
      const name = context.propsValue['getName'];
      const phoneNumber = context.propsValue['getPhone'];

      try {
        const response = await Contact.createContact(apiKey, email, name, `+${phoneNumber.toString()}`);
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
