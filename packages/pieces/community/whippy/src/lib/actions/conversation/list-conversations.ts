/**
List Conversations Action

This action list conversations in Whippy. 

API Documentation: https://docs.whippy.ai/reference/getconversations
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { Conversation } from '../../api/api';
import { appAuth } from '../../..';

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
    getOffset: Property.Number({
      displayName: 'Offset',
      required: false,
    }),
    getUnreadCount: Property.Number({
      displayName: 'Unread Count',
      required: false,
    }),
    getStatus: Property.Array({
      displayName: 'Statuses',
      required: false,
    }),
    getType: Property.Dropdown({
      displayName: 'Type',
      required: false,
      options: async () => {
        return {
          disabled: false,
          options: [
            {
              label: 'phone',
              value: 'phone',
            },
            {
              label: 'email',
              value: 'email',
            },
          ],
          defaultValue: 'email',
        };
      },
      refreshers: [],
    }),
    getChannelsId: Property.Array({
      displayName: 'Channels [ID]',
      description: 'channel IDs',
      required: false,
    }),
    getChannelsPhone: Property.Array({
      displayName: 'Channels [Phone]',
      description: 'channel phones',
      required: false,
    }),
    getContactsId: Property.Array({
      displayName: 'Contacts [ID]',
      description: 'contact IDs',
      required: false,
    }),
    getContactsPhone: Property.Array({
      displayName: 'Contacts [Phone]',
      description: 'contact phones',
      required: false,
    }),
    getContactsEmail: Property.Array({
      displayName: 'Contacts [email]',
      description: 'contact email',
      required: false,
    }),
    getContactsName: Property.Array({
      displayName: 'Contacts [name]',
      description: 'conatct name',
      required: false,
    }),
    getLastMessage: Property.Object({
      displayName: 'Last Message',
      description: 'Last Message date',
      required: false,
      defaultValue: {
        after: Property.DateTime({
          displayName: 'After',
          required: false,
        }),
        before: Property.DateTime({
          displayName: 'Before',
          required: false,
        }),
      },
    }),
    getCreatedAt: Property.Object({
      displayName: 'Created At',
      description: 'Created At date',
      required: false,
      defaultValue: {
        after: Property.DateTime({
          displayName: 'After',
          required: false,
        }),
        before: Property.DateTime({
          displayName: 'Before',
          required: false,
        }),
      },
    }),
    getUpdatedAt: Property.Object({
      displayName: 'Updated At',
      description: 'Updated At date',
      required: false,
      defaultValue: {
        after: Property.DateTime({
          displayName: 'After',
          required: false,
        }),
        before: Property.DateTime({
          displayName: 'Before',
          required: false,
        }),
      },
    }),
    getAssignedUsers: Property.Array({
      displayName: 'Assigned Users',
      description: 'assigned user IDs',
      required: false,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const limit = context.propsValue['getLimit'];
    const offset = context.propsValue['getOffset'];
    const unreadCount = context.propsValue['getUnreadCount'];
    const status = context.propsValue['getStatus'];
    const type = context.propsValue['getType'];
    const channelsId = context.propsValue['getChannelsId'];
    const channelsPhone = context.propsValue['getChannelsPhone'];
    const contactId = context.propsValue['getContactsId'];
    const contactPhone = context.propsValue['getContactsPhone'];
    const contactEmail = context.propsValue['getContactsEmail'];
    const contactName = context.propsValue['getContactsName'];
    const lastMessage = context.propsValue['getLastMessage'];
    const createdAt = context.propsValue['getCreatedAt'];
    const updatedAt = context.propsValue['getUpdatedAt'];
    const assignedUsers = context.propsValue['getAssignedUsers'];

    try {
      const response = await Conversation.listConversations(
        apiKey,
        limit,
        offset,
        unreadCount,
        status,
        type,
        channelsId,
        channelsPhone,
        contactId,
        contactName,
        contactPhone,
        contactEmail,
        lastMessage,
        createdAt,
        updatedAt,
        assignedUsers
      );
      if (response.success) {
        return response.data;
      } else {
        console.error(response.message);
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to list conversations: ${error}`);
    }
  },
});
