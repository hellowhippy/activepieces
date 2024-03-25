/**
List Conversations Action

This action list conversations in Whippy. 

API Documentation: https://docs.whippy.ai/reference/getconversations
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from "../../api/api";
import { appAuth } from "../../..";

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
      defaultValue: [{
        fieldType: Property.StaticDropdown({
          displayName: 'Field Type',
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
      }],
      required: false,
    }),
    getType: Property.StaticDropdown({
      displayName: 'Type',
      required: false,
      defaultValue: 'email',
      options: {
        options: [
          { label: 'phone', value: 'phone' },
          { label: 'email', value: 'email' },
        ],
      },
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
      description: 'contact name',
      required: false,
    }),
    getLastMessage: Property.Object({
      displayName: 'Last Message Date',
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
      displayName: 'Created At Date',
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
      displayName: 'Updated At Date',
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
      displayName: 'Assigned User IDs',
      required: false,
    })
  },
  async run(context) {
    const api_key = context.auth;
    const limit = context.propsValue['getLimit'];
    const offset = context.propsValue['getOffset'];
    const unread_count = context.propsValue['getUnreadCount'];
    const status = context.propsValue['getStatus'];
    const type = context.propsValue['getType'];
    const channels_id = context.propsValue['getChannelsId'];
    const channels_phone = context.propsValue['getChannelsPhone'];
    const contacts_id = context.propsValue['getContactsId'];
    const contacts_phone = context.propsValue['getContactsPhone'];
    const contacts_email = context.propsValue['getContactsEmail'];
    const contacts_name = context.propsValue['getContactsName'];
    const last_message_date = context.propsValue['getLastMessage'];
    const created_at = context.propsValue['getCreatedAt'];
    const updated_at = context.propsValue['getUpdatedAt'];
    const assigned_users = context.propsValue['getAssignedUsers'];

    let params = '';
    if (offset) {
      params += `offset=${offset}`;
    }
    if (limit) {
      params += `&limit=${limit}`;
    }
    if (unread_count) {
      params += `&unread_count=${unread_count}`;
    }
    if (status) {
      params += `&status[]=${status}`;
    }
    if (type) {
      params += `&type=${type}`;
    }
    if (channels_id) {
      params += `&channels[][id]=${channels_id}`;
    }
    if (channels_phone) {
      params += `&channels[][phone]=${channels_phone}`;
    }
    if (contacts_id) {
      params += `&contacts[][id]=${contacts_id}`;
    }
    if (contacts_phone) {
      params += `&contacts[][phone]=${contacts_phone}`;
    }
    if (contacts_name) {
      params += `&contacts[][name]=${contacts_name}`;
    }
    if (contacts_email) {
      params += `&contacts[][email]=${contacts_email}`;
    }
    if (last_message_date) {
      params += `&last_message_date=${last_message_date}`;
    }
    if (created_at) {
      params += `&created_at=${created_at}`;
    }
    if (updated_at) {
      params += `&updated_at=${updated_at}`;
    }
    if (assigned_users) {
      params += `&assigned_users[]=${assigned_users}`;
    }

    try {
      const response = await callAPI({
        url: `conversations?${params}`,
        method: 'GET',
        api_key: api_key,
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