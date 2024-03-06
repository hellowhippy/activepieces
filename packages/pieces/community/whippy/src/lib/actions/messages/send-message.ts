/**
  Send SMS Action

  This action sends sms in Whippy. to (Destination phone number) 
  and from (Phone of an existing channel belonging to your organization) are required.

  API Documentation: https://docs.whippy.ai/reference/sendsms
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { callAPI } from '../../api/api';
import { appAuth } from '../../..';

export const sendMessage = createAction({
  name: 'send_message',
  auth: appAuth,
  displayName: 'Send Text Message',
  description: 'Send Text Message',
  props: {
    getFromNumber: Property.ShortText({
      displayName: 'Send From Number',
      required: true,
    }),
    getToNumber: Property.ShortText({
      displayName: 'Send To Number',
      required: true,
    }),
    getBody: Property.LongText({
      displayName: 'Message Body',
      required: true,
    }),
    getAttachments: Property.Array({
      displayName: 'Attachment of URLs',
      required: false,
    }),
    getScheduleAt: Property.DateTime({
      displayName: 'Schedule At',
      description:
        'Scheduling time for the message. Requires ISO 86001 format.',
      required: false,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const body = context.propsValue['getBody'];
    const from = context.propsValue['getFromNumber'].toString();
    const to = context.propsValue['getToNumber'].toString();
    const attachments = context.propsValue['getAttachments'] as string[] || null;
    const schedule_at = context.propsValue['getScheduleAt'];

    try {
      const response = await callAPI({
        url: "messaging/sms",
        method: 'POST',
        apiKey: apiKey,
        body: {
          from,
          to,
          body,
          attachments: [attachments],
          schedule_at
        },
      })
      if (response?.success) {
        return response?.data;
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to send message: ${error}`);
    }
  },
});
