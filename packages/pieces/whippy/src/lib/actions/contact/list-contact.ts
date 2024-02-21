/**
list Contacts Action

This action list all contacts in Whippy. 

API Documentation: https://docs.whippy.ai/reference/getcontacts-1
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Contact } from '../../api/api';
import { appAuth } from "../../..";

export const listContacts = createAction({
    name: 'list_contacts',
    auth: appAuth,
    displayName: 'List Contacts',
    description: 'Fetch a list of contacts',
    props: {
      getLimit: Property.Number({
        displayName: 'Limit',
        required: false,
      }),
      getOffset: Property.Number({
        displayName: 'Offset',
        required: false,
      }),
      getName: Property.ShortText({
        displayName: 'Contact Name',
        required: false,
      }),
      getEmail: Property.ShortText({
        displayName: 'Contact Email Address',
        required: false,
      }),
      getPhone: Property.Number({
        displayName: 'Contact Phone Number',
        required: false,
      }),
      getChannelsId: Property.Array({
        displayName: 'Channels [ID]',
        description: 'channel IDs',
        required: false,
      }),
      getChannelsPhone: Property.Array({
        displayName: 'Channels [Phone]',
        description: 'channel phones',
        required: false,
      }),
    },
    async run(context) {
      const apiKey = context.auth;
      const limit = context.propsValue['getLimit'];
      const offset = context.propsValue['getOffset'];
      const name = context.propsValue['getName'];
      const email = context.propsValue['getEmail'];
      const phone = context.propsValue['getPhone'];
      const channelsID = context.propsValue['getChannelsId'];
      const channelsPhone = context.propsValue['getChannelsPhone'];

      try {
          const response = await Contact.listContacts(apiKey, limit, offset, name, email, `+${phone?.toString()}`, channelsID, channelsPhone);
          if (response.success) {
            return response.data; 
          } else {
            console.error(response.message);
            return false;
          }
        } catch (error) {
          throw new Error(`Failed to list contacts: ${error}`);
        }
    },
});