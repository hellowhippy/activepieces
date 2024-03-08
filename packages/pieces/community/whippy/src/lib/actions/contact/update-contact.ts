/**
Update Contact Action

This action updates a contact in Whippy. Contact ID is required. 

API Documentation: https://docs.whippy.ai/reference/updatecontact-1
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";

export const updateContact = createAction({
  name: 'update_contact', 
  auth: appAuth,
  displayName: 'Update Contact',
  description: 'Update Contact',
  props: {
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
    const api_key = context.auth;
    const id = context.propsValue['getContactId'];
    const email = context.propsValue['getEmail'];
    const name = context.propsValue['getName'];
    const phone = context.propsValue['getPhone'];

    try {
      const response = await callAPI({
        url: `contacts/${id}`,
        method: 'PUT',
        api_key: api_key,
        body: {
          phone,
          email,
          name
        },
      })
      if (response.success) {
        return response.data; 
      } else {
        console.error(response.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to update contact: ${error}`);
    }
  }
});