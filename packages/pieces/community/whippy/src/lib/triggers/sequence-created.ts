import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const sequenceCreated = createTrigger({
    auth: appAuth,
    name: 'sequence_created',
    displayName: 'sequence.created',
    description: 'Triggers when a developer created a sequence',
    props: {
        title: Property.ShortText({
            displayName: 'Title',
            required: false,
        }),
        status: Property.Dropdown({
            displayName: 'Status',
            description: 'Sequence status',
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
            title: context.propsValue.title,
            status: context.propsValue.status
        }
        const randomTag = 'sequence.created';
        const webhook = await exampleCommon.subscribeWebhook(
            target,
            randomTag,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_sequence_created_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_sequence_created_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id": "e4a747a3-a290-48da-b671-d3cd591f920b",
            "type": "sequential",
            "steps": [],
            "title": "Sequence",
            "status": "active",
            "industry": '',
            "settings": {
              "max_time": '',
              "on_re_add": "exclude",
              "on_response": "remove",
              "max_add_time": 86400,
              "max_add_per_time": 86400,
              "skip_sending_on_weekend": {
                "enabled": true,
                "use_contact_timezone": true
              },
              "support_sms_quiet_hours": {
                "enabled": true,
                "use_contact_timezone": true
              },
              "max_contact_sequence_runs": 5,
              "only_send_during_business_hours": {
                "enabled": true,
                "use_contact_timezone": true
              }
            },
            "created_at": "2023-11-02T14:02:13",
            "updated_at": "2023-11-02T14:02:13",
            "description": "Sequence",
            "access_level": "organization"
        },
        "event": "sequence.created",
        "request_id": "ad89ad7b-fb12-4bb3-8319-ad4bcb522a9e"
    },
});
