/**
List Conversations Action

This action list conversations in Whippy. 

API Documentation: https://docs.whippy.ai/reference/getconversations
*/

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Conversation } from "../../api/api";
import { appAuth } from "../../../index";

export const listConversations = createAction({
    name: 'list_conversations',
    auth: appAuth,
    displayName: 'List Conversations',
    description: 'Fetch a list of conversations',
    props: {
        getLimit: Property.Number({
            displayName: 'Limit',
            required: false,
        }),
        getUnreadCount: Property.Number({
            displayName: 'Unread Count',
            required: false,
        }),
    },
    async run(context) {
      const apiKey = context.auth;
      const limit = context.propsValue['getLimit'];
      const unreadCount = context.propsValue['getUnreadCount'];

      try {
          const response = await Conversation.listConversations(apiKey, limit, unreadCount);
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