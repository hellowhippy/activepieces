/**
Create Contact Action

This action creates a contact in Whippy. Phone number is required. 

API Documentation: https://docs.whippy.ai/reference/createcontact-1
*/

import { createAction, Property} from "@activepieces/pieces-framework";
import { Contact } from '../../api/api';
import { appAuth } from "../../../index";


export const createContact = createAction({
	name: 'create_contact', 
  auth: appAuth,
  displayName:'Create Contact',
  description: 'Create Contact',
	props: {
        // Properties to ask from the user
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
      const apiKey = context.auth;
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
