/**
Show Conversation Action

This action show a conversation in Whippy. Conversation ID is required.

API Documentation: https://docs.whippy.ai/reference/getconversation
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Conversation } from "../../api/api";
import { appAuth } from "../../../index";

export const listMessage = createAction({
    name: 'list_message',
    auth: appAuth,
    displayName: 'List Message',
    description: 'Fetch a message details',
    props: {
        getConversationId: Property.ShortText({
            displayName: 'Conversation ID',
            required: true,
        }),
    },
    async run(context) {
      const apiKey = context.auth;
      const conversationId = context.propsValue['getConversationId'];
      const limit = 10;
      const offset = 0;

      try {
          const response = await Conversation.listMessages(apiKey, conversationId, limit, offset);
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