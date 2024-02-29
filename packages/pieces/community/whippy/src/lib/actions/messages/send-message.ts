/**
  Send SMS Action

  This action sends sms in Whippy. to (Destination phone number) 
  and from (Phone of an existing channel belonging to your organization) are required.

  API Documentation: https://docs.whippy.ai/reference/sendsms
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { Message } from '../../api/api';
import { appAuth } from '../../..';

export const sendMessage = createAction({
  name: 'send_message',
  auth: appAuth,
  displayName: 'Send Text Message',
  description: 'Send Text Message',
  props: {
    getFromNumber: Property.ShortText({
      displayName: 'Sending Number',
      description:
        'Phone of an existing channel belonging to your organization',
      required: true,
    }),
    getAttachments: Property.Array({
      displayName: 'Attachment of URLs',
      description: 'List of attachment URLs',
      required: false,
    }),
    getBody: Property.LongText({
      displayName: 'Body',
      description: 'Message Body',
      required: false,
    }),
    getOptTo: Property.Object({
      displayName: 'opt_in_to',
      description: 'Setting to opt in contact to specific channels',
      required: false,
      defaultValue: {
        id: Property.ShortText({
          displayName: 'ID',
          required: false,
        }),
        phone: Property.ShortText({
          displayName: 'Phone',
          required: false,
        }),
      },
    }),
    getOptChannel: Property.Dropdown({
      displayName: 'opt_in_to_all_channels',
      description: 'Setting to opt in contact to all channels',
      required: false,
      options: async () => {
        return {
          disabled: false,
          options: [
            {
              label: 'True',
              value: true,
            },
            {
              label: 'False',
              value: false,
            },
          ],
          defaultValue: false,
        };
      },
      refreshers: [],
    }),
    getScheduleAt: Property.DateTime({
      displayName: 'Schedule At',
      description:
        'Scheduling time for the message. Requires ISO 86001 format.',
      required: false,
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
    const scheduleAt = context.propsValue['getScheduleAt'];

    try {
      // Call the generic API function
      const response = await Message.sendMessage(
        apiKey,
        `+${fromNumber.toString()}`,
        body,
        `+${toNumber.toString()}`,
        scheduleAt,
        attachments,
        optIn,
        optChannels
      );
      if (response.success) {
        return response.data;
      } else {
        console.error(response.message);
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to send message: ${error}`);
    }
  },
});
