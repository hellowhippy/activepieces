import { TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const templateCreated = createTrigger({
    auth: appAuth,
    name: 'message_template_created',
    displayName: 'message_template.created',
    description: 'Triggers when a developer created a message template',
    props: {},
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const event = 'message_template.created';
        const webhook = await exampleCommon.subscribeWebhook(
            event,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_message_template_created_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_message_template_created_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id": "bb2df9dd-5d46-4488-80a5-df1e278553ac",
            "title": "Whippy Message Template",
            "message": "Thanks for all the fish!",
            "created_at": "2023-09-26T15:55:43.771415Z",
            "updated_at": "2023-09-26T15:55:43.771415Z",
            "attachments": [
              {
                "url": "https://whippy-public-api-example.s3.us-west-2.amazonaws.com/cat.jpg",
                "content_type": "image/jpeg"
              }
            ],
            "channel_ids": [],
            "access_level": "organization",
            "created_by_id": 42,
            "updated_by_id": '',
            "organization_id": "be1ecaf2-9ce7-448c-8755-e5009ccc4345"
        },
        "event": "message_template.created",
        "request_id": "19bf7d28-6009-471e-b97c-991d9c0efb7b"
    },
});
