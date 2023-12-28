import {
  createAction,
  Property,
  PieceAuth,
  StoreScope,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { callAPI, APICallParams } from '../../api/api';

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
    //context.store.get('message', StoreScope.FLOW).then((data:any)=>{
    //let phoneNumber = data.phoneNumber;
    //let message = data.message;

    const apiKey = context.propsValue['getAPIKey'];
    const message = context.propsValue['getMessage'];
    const toNumber = context.propsValue['getToNumber'];

    const apiParams: APICallParams = {
      url: 'https://api.whippy.co/v1/messaging/sms',
      method: 'POST',
      apiKey: apiKey,
      body: { from: '+12133381105', to: toNumber, body: message },
    };

    // Call the generic API function
    const response = await callAPI(apiParams);
    
    return response;
  },
});
