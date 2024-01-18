import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { showCommon, WebhookInformation } from "../../common";

export const showApplication = createTrigger({
  auth: appAuth,
  name: 'show_application',
  displayName: 'Show Application',
  description: 'Triggers when a developer showed developer application',
  props: {
    id: Property.ShortText({
        displayName: 'Developer Application ID',
        required: true
    })
  },
  sampleData: {
    "id": "97c60354-3dc0-4822-8582-be03339b6ffe"
  },
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const target: any = {
        id: context.propsValue.id
    }

    const webhook = await showCommon.subscribeWebhook(context.auth, {
        event: 'APPLICATION.SHOWED',
        target: target,
        webhookUrl: context.webhookUrl
    });
    await context.store.put(`_show_application_trigger`, webhook);
  },
  async onDisable(context) {
    // const webhook = await context.store.get<WebhookInformation>(`_show_application_trigger`);

    // if (webhook) {
    //     await showCommon.unsubscribeWebhook(context.auth, webhook.name);
    // }
  },
  async run(context) {
    return [context.payload.body];
  },
});
