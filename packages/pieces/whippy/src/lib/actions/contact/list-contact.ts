import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Contact } from '../../api/api';

export const listContacts = createAction({
    name: 'list_contacts',
    auth: PieceAuth.None(),
    displayName: 'List Contacts',
    description: 'Fetch a list of contacts',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
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
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const name = context.propsValue['getName'];
        const email = context.propsValue['getEmail'];
        const phone = context.propsValue['getPhone'];

        try {
            const response = await Contact.listContacts(apiKey, name, email, phone?.toString());
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
});``