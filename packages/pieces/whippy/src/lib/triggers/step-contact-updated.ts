import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const stepContactUpdated = createTrigger({
    auth: appAuth,
    name: 'step_contact_updated',
    displayName: 'step_contact.updated',
    description: 'Triggers when a developer updated a step contact',
    props: {
        id: Property.ShortText({
            displayName: 'ID',
            description: 'Id  of Step Contact',
            required: true
        }), 
        sequenceID: Property.ShortText({
            displayName: 'Sequence ID',
            required: true,
        }),
        stepID: Property.ShortText({
            displayName: 'Step ID',
            required: true,
        }),
        status: Property.Dropdown({
            displayName: 'Status',
            description: 'Step Contacts status',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'finished',
                            value : 'finished',
                        },
                        {
                            label : 'active',
                            value : 'active',
                        }
                    ],
                    defaultValue: ' ',
                };
            },
            refreshers: []
        })
    },
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const target: any = {
            id: context.propsValue.id,
            sequence_id: context.propsValue.sequenceID,
            step_id: context.propsValue.stepID,
            status: context.propsValue.status
        }
        const randomTag = 'step_contact.updated';
        const webhook = await exampleCommon.subscribeWebhook(
            target,
            randomTag,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_step_contact_updated_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_step_contact_updated_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id": "8276e83f-21b1-4f16-b3a3-1a1a7c8e46f1",
            "status": "finished",
            "contact": {
              "id": "147363b7-3ce5-445f-9193-27e96f1cf12d",
              "name": "Giovanni Torp",
              "email": '',
              "phone": "+13603094336"
            },
            "step_id": "5137e2c4-fe04-4c55-8810-943b33fd0f72",
            "channel_id": "70c9cc95-e78b-4acf-9079-b0531c1eeff3",
            "created_at": "2023-11-02T14:03:44Z",
            "updated_at": "2023-11-02T14:03:45Z",
            "added_by_id": 1,
            "sequence_id": "e4a747a3-a290-48da-b671-d3cd591f920b",
            "clicked_link": false,
            "scheduled_at": "2023-11-02T14:03:44.000000Z",
            "unsubscribed": false,
            "run_created_at": "2023-11-02T14:03:45",
            "run_updated_at": "2023-11-02T14:03:46",
            "contact_messages": [
              {
                "id": "580ddf5c-1b53-404b-92d1-d03fcacd1c6a",
                "delivery_status": "delivered",
                "contact_id": "147363b7-3ce5-445f-9193-27e96f1cf12d",
                "conversation_id": "6c26b6a5-3525-4a5e-b1b9-3f409b79ae7b",
                "body": "I'm Batman!",
                "attachments": [
                  {
                    "url": "https://1.bp.blogspot.com/_J9PlRvGGXS8/Su46nKRk_wI/AAAAAAAABZQ/d73kC45JkGw/s400/batman-avatar-10.jpg",
                    "content_type": "image/png"
                  }
                ]
              }
            ]
        },
        "event": "step_contact.updated",
        "request_id": "4e3ba6f6-cfbd-4349-8859-d9eb3747accd"
    },
});
