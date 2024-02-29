import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const campaignUpdated = createTrigger({
    auth: appAuth,
    name: 'campaign_updated',
    displayName: 'campaign.updated',
    description: 'Triggers when a developer updated a campaign',
    props: {
        id: Property.ShortText({
            displayName: 'ID',
            description: 'Id  of Sequence',
            required: true
        }), 
        title: Property.ShortText({
            displayName: 'Title',
            required: false,
        }),
        body: Property.ShortText({
            displayName: 'Body',
            required: false,
        })
    },
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const target: any = {
            id: context.propsValue.id,
            title: context.propsValue.title,
            body: context.propsValue.body
        }
        const randomTag = 'campaign.updated';
        const webhook = await exampleCommon.subscribeWebhook(
            target,
            randomTag,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_campaign_updated_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_campaign_updated_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id": "44c0f2d4-6085-440f-b5c2-bedf0ccf33b6",
            "body": "Cool campaign sent from Whippy!",
            "title": "Whippy Campaign",
            "status": "draft",
            "created_at": "2023-09-26T15:54:48.951970Z",
            "updated_at": "2023-09-26T15:54:54.483551Z",
            "attachments": [],
            "schedule_at": ''
        },
        "event": "campaign.updated",
        "request_id": "87218144-cbd2-4c0c-b9dc-b84f3ddc8c10"
    },
});
