import { TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const stepCreated = createTrigger({
    auth: appAuth,
    name: 'step_created',
    displayName: 'step.created',
    description: 'Triggers when a developer created a step',
    props: {},
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const event = 'step.created';
        const webhook = await exampleCommon.subscribeWebhook(
            event,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_step_created_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_step_created_trigger`);

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
            "body": "Step",
            "title": "Step",
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
            "updated_at": "2023-11-02T14:02:24",
            "attachments": [],
            "sequence_id": "e4a747a3-a290-48da-b671-d3cd591f920b",
            "schedule_options": {
              "days": "1",
              "hours": "0",
              "minutes": "0",
              "timezone": "America/Detroit"
            }
        },
        "event": "step.created",
        "request_id": "065c784c-b1bb-4471-bc2a-d9efc14ebefe"
    },
});
