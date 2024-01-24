import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { showCommon } from "../../common";
import { nanoid } from "nanoid";
import { getAccessTokenOrThrow } from "@activepieces/pieces-common";

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
    const randomTag = `show_developer_application_${nanoid()}`;
    await showCommon.subscribeWebhook(
        context.propsValue.id,
        randomTag,
        context.webhookUrl,
        context.auth
    );
    await context.store?.put<WebhookInformation>('_show_application_trigger', {
        tag: randomTag,
    });
  },
  async onDisable(context) {
    const response = await context.store?.get<WebhookInformation>(
      '_show_application_trigger'
    );
    if (response !== null && response !== undefined) {
        await showCommon.unsubscribeWebhook(
            context.propsValue.id,
            response.tag,
            context.auth
        );
  }
  },
  async run(context) {
    return [context.payload.body];
  },
});

interface WebhookInformation {
  tag: string;
}
