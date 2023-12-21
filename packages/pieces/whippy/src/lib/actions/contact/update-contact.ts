import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";

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

    const options = {
      method: 'PUT', // Use PUT method for updating
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-WHIPPY-KEY': apiKey,
      },
      body: JSON.stringify({
        phone: phoneNumber,
        email: email,
        name: name,
      }),
    };

    try {
      const response = await fetch(`https://api.whippy.co/v1/contacts/${contactId}`, options);
      const responseData = await response.json();
      console.log(responseData);

      return responseData;
    } catch (error) {
      console.error(error);

    return false;

    }
  }
});
