import {
  createAction,
  Property,
  PieceAuth,
  StoreScope,
} from '@activepieces/pieces-framework';
import { Message } from '../../api/api';

export const sendMessage = createAction({
  name: 'send_message',
  auth: PieceAuth.None(),
  displayName: 'Send Text Message',
  description: 'Send Text Message',
  props: {
    // Properties to ask from the user, in this ask we will take number of
    getAPIKey: Property.ShortText({
      displayName: 'API Key',
      required: true,
    }),
    getMessage: Property.ShortText({
      displayName: 'Text Message',
      required: true,
    }),
    getToNumber: Property.ShortText({
      displayName: 'Destination Number',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.propsValue['getAPIKey'];
    const message = context.propsValue['getMessage'];
    const toNumber = context.propsValue['getToNumber'];

    try {
      // Call the generic API function
      const response = await Message.sendMessage(apiKey, '+12133381105', toNumber, message);
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
