/**
Create Note Action

This action creates a note in Whippy. to (Destination phone number) 
and from (Phone of an existing channel belonging to your organization) are required.

API Documentation: https://docs.whippy.ai/reference/createconversationnote
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Note } from '../../api/api';
import { appAuth } from "../../..";

export const createNote = createAction({
  name: 'create_note', 
  auth: appAuth,
  displayName:'Create Note',
  description: 'Create Note',
  props: {
    getFromNumber: Property.ShortText({
      displayName: 'Sending Number',
      description: 'Phone of an existing channel belonging to your organization',
      required: true,
    }),
    getAttachments: Property.Array({
      displayName: 'Attachment of URLs',
      description: 'List of attachment URLs',
      required: false,
    }),
    getBody: Property.LongText({
      displayName: 'Body',
      description: 'Note Body',
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
      displayName: 'Destination Number',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const body = context.propsValue['getBody'] || '';
    const fromNumber = context.propsValue['getFromNumber'];
    const toNumber = context.propsValue['getToNumber'];
    const attachments = context.propsValue['getAttachments'];
    const optIn = context.propsValue['getOptTo'];
    const optChannels = context.propsValue['getOptChannel'];

    try {
      const response = await Note.createNote(apiKey, `+${fromNumber.toString()}`, body, `+${toNumber.toString()}`,
      attachments, optIn, optChannels);
      if (response.success) {
        return response.data; 
      } else {
        console.error(response.message);
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to create note: ${error}`);
    }
  },
});
