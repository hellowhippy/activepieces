import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Note } from '../../api/api';

export const createNote = createAction({
  name: 'create_note', 
  auth: PieceAuth.None(),
  displayName:'Create Note',
  description: 'Create Note',
  props: {
    // Properties to ask from the user, in this ask we will take number of
    getAPIKey: Property.ShortText({
      displayName: 'API Key',
      required: true,
    }),
    getNote: Property.LongText({
      displayName: 'Create Note',
      required: false,
    }),
    getToNumber: Property.ShortText({
      displayName: 'Destination Number',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.propsValue['getAPIKey'];
    const note = context.propsValue['getNote'] || '';   
    const phoneNumber = context.propsValue['getToNumber'];

    try {
        const response = await Note.createNote(apiKey, '+12133381105' , note, phoneNumber);
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
