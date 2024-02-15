/**
Update Contact Action

This action updates a contact in Whippy. Contact ID is required. 

API Documentation: https://docs.whippy.ai/reference/updatecontact-1
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Contact } from '../../api/api';
import { appAuth } from "../../../index";

export const updateContact = createAction({
  name: 'update_contact', 
  auth: appAuth,
  displayName: 'Update Contact',
  description: 'Update Contact',
  props: {
    // Properties to ask from the user
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
    const apiKey = context.auth;
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