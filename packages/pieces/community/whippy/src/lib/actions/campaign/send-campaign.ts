/**
Send Campaigns Action

This action sends campaigns in Whippy. From, To, and Title are required.

API Documentation: https://docs.whippy.ai/reference/sendcampaign
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";

interface ToNumber {
    custom_a: string;
    custom_b: string;
    custom_c: string;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
    phone: string;
}


export const sendCampaign = createAction({
    name: 'send_campaign',
    auth: appAuth,
    displayName: 'Send Campaign',
    description: 'Send Campaign',
    props: {
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
        getCustomData: Property.Object({
            displayName: 'Custom Data Object',
            required: false,
            description: 'List of contacts that would receive the campaign.',
            defaultValue: {
                custom_object_id: Property.ShortText({
                    displayName: 'Custom Object ID',
                    description: 'The ID of the custom object that the custom data belongs to.',
                    required: false,
                }),
                resource: Property.Dropdown({
                    displayName: 'Resource',
                    description: 'The resource type that the custom data will be associated with. Must be one of: contact, campaign_contact',
                    required: false,
                    options: async () => {
                        return {
                            disabled: false,
                            options: [
                                {
                                    label: 'contact',
                                    value: 'contact',
                                },
                                {
                                    label : 'campaign contact',
                                    value : 'campaign_contact',
                                }
                            ],
                            defaultValue: false,
                        };
                    },
                    refreshers: []
                }),
            },
        }),
        getExclude: Property.Object({
            displayName: 'Exclude Object',
            required: false,
            description: 'Optional settings to exclude contacts from the campaign',
            defaultValue: {
                openConversation: Property.Dropdown({
                    displayName: 'Open Conversations Contacts',
                    description: 'Exclude contacts who have open conversations at the time the campaign is processed',
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
                                    label : 'False',
                                    value : false,
                                }
                            ],
                            defaultValue: false,
                        };
                    },
                    refreshers: []                
                }),
                lastCampaign: Property.Number({
                    displayName: 'Time last campaign',
                    description: 'Exclude contacts who have last received a campaign in the specified number of days in the past from the time the current campaign is processed',
                    required: false,
                }),
            },
        }),
        getBody: Property.LongText({
            displayName: 'Campaign Message Body',
            required: false,
        }),
        getToNumber: Property.Array({
            displayName: 'Destination Number',
            required: true,
            description: 'List of contacts that would receive the campaign.',
            defaultValue: [{
                custom_a: "",
                custom_b: "",
                custom_c: "",
                email: "",
                first_name: "",
                last_name: "",
                name: "",
                phone: "",
            }] as ToNumber[],
        }),
    },
    async run(context) {
        const apiKey = context.auth;
        const fromNumber = context.propsValue['getFromNumber'];
        const toNumber = context.propsValue['getToNumber'];
        const title = context.propsValue['getTitle'];
        const scheduleAt = context.propsValue['getSchedule'];
        const body = context.propsValue['getBody'];
        const attachment = context.propsValue['getAttachments'];
        const automationTemplates = context.propsValue['getAutomationTemplates'];
        const exclude = context.propsValue['getExclude'];
        const customData = context.propsValue['getCustomData'];

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-WHIPPY-KEY': apiKey,
            },
            body: JSON.stringify({
                from: `+${fromNumber.toString()}`,
                body: body,
                attachments: attachment,
                automation_templates: automationTemplates,
                title: title,
                schedule_at: scheduleAt,
                to: `+${toNumber.toString()}`,
                custom_data: customData,
                exclude: exclude,
            }),
        };

        try {
            const response = await fetch('https://api.whippy.co/v1/campaigns/sms', options);
            const responseData = await response.json();
            console.log(responseData);

            return responseData;
        } catch (error) {
            throw new Error(`Failed to send campaign: ${error}`);
        }
    },
});
