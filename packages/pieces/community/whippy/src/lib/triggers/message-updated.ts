import { TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const messageUpdated = createTrigger({
    auth: appAuth,
    name: 'message_updated',
    displayName: 'message.updated',
    description: 'Triggers when a developer updated a message',
    props: {},
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const event = 'message.updated';
        const webhook = await exampleCommon.subscribeWebhook(
            event,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_message_updated_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_message_updated_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id":"5e09c7cc-27e8-4d91-89ee-4ea5bafaaa15",
            "to":"+14244023931",
            "body":"Olá, Clark Kent, obrigado por enviar mensagens à Organização 1. Um membro de nossa equipe entrará em contato com você em breve neste número.",
            "from":"+12183925232",
            "step_id":'',
            "language":'',
            "direction":"OUTBOUND",
            "channel_id":"be1ecaf2-9ce7-448c-8755-e5009ccc4345",
            "contact_id":"8241b8e5-98a2-44d7-975b-15f5c2bf3cf4",
            "created_at":"2023-08-24T10:52:28.430748Z",
            "updated_at":"2023-08-24T10:52:28.498798Z",
            "attachments":[
              
            ],
            "campaign_id":'',
            "sequence_id":'',
            "conversation_id":"742993a5-c9c6-4d7d-bf09-31417a1c04a9",
            "delivery_status":"failed",
            "step_contact_id":'',
            "translated_body":'',
            "campaign_contact_id":'',
            "translation_language":''
        },
        "event":"message.updated",
        "request_id":"647e08d7-e68e-4efb-bd8c-29038e7ac09a"
    },
});
