import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const sequenceRunCreated = createTrigger({
    auth: appAuth,
    name: 'sequence_run_created',
    displayName: 'sequence_run.created',
    description: 'Triggers when a developer created a sequence run',
    props: {
        sequenceID: Property.ShortText({
            displayName: 'Sequence ID',
            required: true,
        }),
        status: Property.Dropdown({
            displayName: 'Status',
            description: 'Sequence runs status',
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
            sequence_id: context.propsValue.sequenceID,
            status: context.propsValue.status
        }
        const randomTag = 'sequence_run.created';
        const webhook = await exampleCommon.subscribeWebhook(
            target,
            randomTag,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_sequence_run_created_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_sequence_run_created_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id": "f15d4795-a747-4d56-9109-6a5b4d18f295",
            "status": "active",
            "contact": {
              "id": "147363b7-3ce5-445f-9193-27e96f1cf12d",
              "name": "Giovanni Torp",
              "email": '',
              "phone": "+13603094336"
            },
            "channel_id": '',
            "created_at": "2023-11-02T14:03:45",
            "updated_at": "2023-11-02T14:03:45",
            "added_by_id": '',
            "sequence_id": "e4a747a3-a290-48da-b671-d3cd591f920b",
            "last_step_id": "5137e2c4-fe04-4c55-8810-943b33fd0f72",
            "step_contacts": []
        },
        "event": "sequence_run.created",
        "request_id": "cddc9ece-d4dd-41d2-abaf-7c6f17ea4d6f"
    },
});
