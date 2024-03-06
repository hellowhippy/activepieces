/**
Show Conversation Action

This action show a conversation in Whippy. Conversation ID is required.

API Documentation: https://docs.whippy.ai/reference/getconversation
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from "../../api/api";
import { appAuth } from "../../..";

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
      getMessages: Property.Object({
        displayName: 'Messages',
        description: 'Messages Object',
        required: false,
        defaultValue: {
          limit: Property.Number({
            displayName: 'Limit',
            description: 'Limit of conversation messages to return',
            required: false,
          }),
          offset: Property.Number({
            displayName: 'Offset',
            description: 'Offset for the messages filter',
            required: false,
          }),
        },
      }),
    },
    async run(context) {
      const apiKey = context.auth;
      const id = context.propsValue['getConversationId'];
      const messages = context.propsValue['getMessages'];

      try {
        const response = await callAPI({
          url: `conversations/${id}`,
          method: 'GET',
          apiKey: apiKey,
          body :{},
          params: {
            messages
          },
        })
        if (response?.success) {
          return response?.data; 
        } else {
          console.error(response?.message);
          return response?.message;
        }
      } catch (error) {
        throw new Error(`Failed to list message: ${error}`);
      }
    },
});
