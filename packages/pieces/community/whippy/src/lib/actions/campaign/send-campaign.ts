/**
Send Campaigns Action

This action sends campaigns in Whippy. From, To, and Title are required.

API Documentation: https://docs.whippy.ai/reference/sendcampaign
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { callAPI } from "../../api/api";

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
            displayName: 'Send From Number',
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
            displayName: 'Send To Number',
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
        const from = context.propsValue['getFromNumber'].toString();
        const to = context.propsValue['getToNumber'].toString();
        const title = context.propsValue['getTitle'];
        const schedule_at = context.propsValue['getSchedule'];
        const body = context.propsValue['getBody'];
        const attachments = context.propsValue['getAttachments'];
        const automation_templates = context.propsValue['getAutomationTemplates'];
        const exclude = context.propsValue['getExclude'];
        const custom_data = context.propsValue['getCustomData'];

        try {
            const response = await callAPI({
                url: "campaigns/sms",
                method: 'POST',
                apiKey: apiKey,
                body: {
                    from,
                    body,
                    attachments: [attachments],
                    automation_templates:[automation_templates],
                    title,
                    schedule_at,
                    to: [to],
                    custom_data,
                    exclude,
                },
            })
            if (response?.success) {
                return response?.data; 
              } else {
                console.error(response?.message);
                return response?.message;
              }
        } catch (error) {
            throw new Error(`Failed to send campaign: ${error}`);
        }
    },
});
