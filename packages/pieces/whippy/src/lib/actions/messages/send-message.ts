/**
Send SMS Action

This action sends sms in Whippy. to (Destination phone number) 
and from (Phone of an existing channel belonging to your organization) are required.

API Documentation: https://docs.whippy.ai/reference/sendsms
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Message } from '../../api/api';
import { appAuth } from "../../../index";

export const sendMessage = createAction({
  name: 'send_message',
  auth: appAuth,
  displayName: 'Send Text Message',
  description: 'Send Text Message',
  props: {
    // Properties to ask from the user, in this ask we will take number of
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
    const apiKey = context.auth;
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