/**
Create Note Action

This action creates a note in Whippy. to (Destination phone number) 
and from (Phone of an existing channel belonging to your organization) are required.

API Documentation: https://docs.whippy.ai/reference/createconversationnote
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";

export const createNote = createAction({
  name: 'create_note', 
  auth: appAuth,
  displayName:'Create Note',
  description: 'Create Note',
  props: {
    getFromNumber: Property.ShortText({
      displayName: 'Send From Number',
      required: true,
    }),
    getAttachments: Property.Array({
      displayName: 'Attachment of URLs',
      required: false,
    }),
    getBody: Property.LongText({
      displayName: 'Note Body',
      required: false,
    }),
    getOptTo: Property.Object({
      displayName: 'opt_in_to',
      description: 'Setting to opt in contact to specific channels',
      required: false,
      defaultValue: {
        idOb: "",
        phoneOb: "",
        id: Property.ShortText({
          displayName: 'ID',
          required: false,
        }),
        phone: Property.ShortText({
          displayName: 'Phone',
          required: false,
        }),
      }
    }),
    getOptChannel: Property.StaticDropdown({
      displayName: 'opt_in_to_all_channels',
      description: 'Setting to opt in contact to all channels',
      required: false,
      options: { 
        options: [
          { label: 'true', value: '0' },
          { label: 'false', value: '1' }
        ] } 
    }),
    getToNumber: Property.ShortText({
      displayName: 'Send To Number',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const body = context.propsValue['getBody'] || '';
    const from = context.propsValue['getFromNumber'];
    const to = context.propsValue['getToNumber'];
    const attachments = context.propsValue['getAttachments'];
    const opt_in_to = context.propsValue['getOptTo'];
    const opt_in_to_all_channels = context.propsValue['getOptChannel'];

    try {
      const response = await callAPI({
        url: "messaging/note",
        method: 'POST',
        apiKey: apiKey,
        body: {
          from,
          to,
          body,
          attachments: [attachments],
          opt_in_to,
          opt_in_to_all_channels
        },
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to create note: ${error}`);
    }
  },
});
