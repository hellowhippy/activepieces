/**
  List Contacts Action
  This action list all contacts in Whippy. 
  API Documentation: https://docs.whippy.ai/reference/getcontacts-1
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { callAPI } from '../../api/api';
import { appAuth } from '../../..';

export const listContacts = createAction({
  name: 'list_contacts',
  auth: appAuth,
  displayName: 'List Contacts',
  description: 'Fetch a list of contacts',
  props: {
    getName: Property.ShortText({
      displayName: 'Contact Name',
      required: false,
    }),
    getEmail: Property.ShortText({
      displayName: 'Contact Email Address',
      required: false,
    }),
    getPhone: Property.ShortText({
      displayName: 'Contact Phone Number',
      required: false,
    }),
    getOffset: Property.Number({
      displayName: 'API Offset',
      required: false,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const offset = context.propsValue['getOffset'];
    const name = context.propsValue['getName'];
    const email = context.propsValue['getEmail'];
    const phone = context.propsValue['getPhone'];

    // generate query params if the user has provided any of the optional fields
    let params = `offset=${offset}`;

    if (name) {
      params += `&name=${name}`;
    }
    if (email) {
      params += `&email=${email}`;
    }
    if (phone) {
      params += `&phone=${phone}`;
    }

    try {
      const response = await callAPI({
        url: `contacts?${params}`,
        method: 'GET',
        apiKey: apiKey,
      });
      if (response?.success) {
        return response?.data;
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to list contacts: ${error}`);
    }
  },
});
