import { TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const stepUpdated = createTrigger({
    auth: appAuth,
    name: 'step_updated',
    displayName: 'step.updated',
    description: 'Triggers when a developer updated a step',
    props: {},
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const event = 'step.updated';
        const webhook = await exampleCommon.subscribeWebhook(
            event,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_step_updated_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_step_updated_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id": "5137e2c4-fe04-4c55-8810-943b33fd0f72",
            "body": "Step 1",
            "title": "Step 1",
            "status": "active",
            "position": 0,
            "analytics": {
              "responses": 0,
              "link_clicks": 0,
              "unsubscribes": 0,
              "sent_messages": 0,
              "slated_messages": 0,
              "failed_deliveries": 0
            },
            "created_at": "2023-11-02T14:02:24",
            "updated_at": "2023-11-02T14:02:33",
            "attachments": [],
            "sequence_id": "e4a747a3-a290-48da-b671-d3cd591f920b",
            "schedule_options": {
              "days": "0",
              "hours": "0",
              "minutes": "0",
              "timezone": "America/Detroit"
            }
        },
        "event": "step.updated",
        "request_id": "0a759a14-98d9-4c99-a810-61be02fe50b0"
    },
});
