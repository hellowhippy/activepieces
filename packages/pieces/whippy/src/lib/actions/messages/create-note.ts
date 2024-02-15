/**
Create Note Action

This action creates a note in Whippy. to (Destination phone number) 
and from (Phone of an existing channel belonging to your organization) are required.

API Documentation: https://docs.whippy.ai/reference/createconversationnote
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Note } from '../../api/api';
import { appAuth } from "../../../index";

export const createNote = createAction({
  name: 'create_note', 
  auth: appAuth,
  displayName:'Create Note',
  description: 'Create Note',
  props: {
    // Properties to ask from the user, in this ask we will take number of
    getNote: Property.LongText({
      displayName: 'Create Note',
      required: false,
    }),
    getToNumber: Property.ShortText({
      displayName: 'Destination Number',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const note = context.propsValue['getNote'] || '';   
    const phoneNumber = context.propsValue['getToNumber'];

    try {
        const response = await Note.createNote(apiKey, '+12133381105' , note, phoneNumber);
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