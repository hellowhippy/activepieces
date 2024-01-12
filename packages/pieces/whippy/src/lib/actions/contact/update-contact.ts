/**
Update Contact Action

This action updates a contact in Whippy. Contact ID is required. 

API Documentation: https://docs.whippy.ai/reference/updatecontact-1
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Contact } from '../../api/api';

export const updateContact = createAction({
  name: 'update_contact', 
  auth: PieceAuth.None(),
  displayName: 'Update Contact',
  description: 'Update Contact',
  props: {
    // Properties to ask from the user
    getAPIKey: Property.ShortText({
      displayName: 'API Key',
      required: true,
    }),
    getContactId: Property.ShortText({
      displayName: 'Contact ID',
      required: true,
    }),
    getEmail: Property.ShortText({
      displayName: 'Contact email address',
      required: false,
    }),
    getName: Property.ShortText({
      displayName: 'Contact Name',
      required: false,
    }), 
    getPhone: Property.Number({
      displayName: 'Contact Phone Number',
      required: false,
    }),
  },
  async run(context) {
    const apiKey = context.propsValue['getAPIKey'];
    const contactId = context.propsValue['getContactId'];
    const email = context.propsValue['getEmail'];
    const name = context.propsValue['getName'];
    const phoneNumber = context.propsValue['getPhone'];

    try {
      const response = await Contact.updateContacts(apiKey, contactId, email, name, `+${phoneNumber?.toString()}`);
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
  }
});