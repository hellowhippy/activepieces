/**
Send Campaigns Action

This action sends campaigns in Whippy. From, To, and Title are required.

API Documentation: https://docs.whippy.ai/reference/sendcampaign
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";

export const sendCampaign = createAction({
    name: 'send_campaign',
    auth: PieceAuth.None(),
    displayName: 'Send Campaign',
    description: 'Send Campaign',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getFromNumber: Property.ShortText({
            displayName: 'Sending Number',
            required: true,
        }),
        getAttachments: Property.Array({
            displayName: 'Attachment of URLs',
            required: false,
        }),
        getAutomationTemplates: Property.Array({
            displayName: 'IDs of Automation Templates',
            required: false,
        }),
        getTitle: Property.ShortText({
            displayName: 'Title',
            required: true,
        }),
        getSchedule: Property.DateTime({
            displayName: 'Scheduling Time',
            required: false,
        }),
        getBody: Property.LongText({
            displayName: 'Campaign Message Body',
            required: false,
        }),
        getToNumber: Property.Object({
            displayName: 'Destination Number',
            required: true,
            description: 'List of contacts that would receive the campaign.',
            defaultValue: {
                custom_a: "",
                custom_b: "",
                custom_c: "",
                email: "",
                first_name: "",
                last_name: "",
                name: "",
                phone: Property.ShortText({
                    displayName: 'Sending Number',
                    required: true,
                }),
            },
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const fromNumber = context.propsValue['getFromNumber'];
        const toNumber = context.propsValue['getToNumber'];
        const title = context.propsValue['getTitle'];
        const scheduleAt = context.propsValue['getSchedule'];
        const body = context.propsValue['getBody'];
        const attachment = context.propsValue['getAttachments'];
        const automationTemplates = context.propsValue['getAutomationTemplates'];

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-WHIPPY-KEY': apiKey,
            },
            body: JSON.stringify({
                from: fromNumber,
                body: body,
                attachments: attachment,
                automation_templates: automationTemplates,
                title: title,
                schedule_at: scheduleAt,
                to: [{toNumber}],
            }),
        };

        try {
            const response = await fetch('https://api.whippy.co/v1/campaigns/sms', options);
            const responseData = await response.json();
            console.log(responseData);

            return responseData;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
});
