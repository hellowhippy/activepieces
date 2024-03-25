/**
Update Conversation Action

This action update the conversation in Whippy. Conversation_ID is required

API Documentation: https://docs.whippy.ai/reference/updateconversation
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from "../../api/api";
import { appAuth } from "../../..";

export const updateConversation = createAction({
  name: 'update_conversation',
  auth: appAuth,
  displayName: 'Update Conversation',
  description: 'Fetch a update of conversation',
  props: {
    getID: Property.ShortText({
        displayName: 'ID',
        required: true,
    }),
    getUnreadCount: Property.StaticDropdown({
        displayName: 'Status',
        required: true,
        defaultValue: 'closed',
        options: {
            options: [
                { label: '0', value: '0' },
                { label: '1', value: '1' },
            ],
        },
    }),
    getStatus: Property.StaticDropdown({
        displayName: 'Status',
        required: true,
        defaultValue: 'closed',
        options: {
            options: [
                { label: 'open', value: 'open' },
                { label: 'closed', value: 'closed' },
                { label: 'automated', value: 'automated' },
                { label: 'spam', value: 'spam' }
            ],
        },
    }),
    getAssignedUsers: Property.Number({
      displayName: 'Assigned User IDs',
      required: false,
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const id = context.propsValue['getID'];
    const unread_count = context.propsValue['getUnreadCount'];
    const status = context.propsValue['getStatus'];
    const assigned_users = context.propsValue['getAssignedUsers'];

    try {
      const response = await callAPI({
        url: `conversations/${id}`,
        method: 'PUT',
        api_key: api_key,
        body: {
            unread_count,
            status,
            assigned_users
        }
      });
      if (response?.success) {
        return response?.data;
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to list contacts: ${error}`);
    }
  },
});