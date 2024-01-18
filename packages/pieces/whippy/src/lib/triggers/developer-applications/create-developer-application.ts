import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { createCommon } from "../../common";

export const createApplication = createTrigger({
  auth: appAuth,
  name: 'create_application',
  displayName: 'Create Application',
  description: 'Triggers when a developer created developer application',
  props: {
    active: Property.StaticDropdown({
        displayName: 'Active',
        required: false,
        options: {
            options: [
              { label: "true", value: "true" },
              { label: "false", value: "false" }
            ]
        }
    }),
    api_key_id: Property.ShortText({
        displayName: 'API Key',
        required: false
    }),
    description: Property.LongText({
        displayName: 'Description',
        required: false
    }),
    name: Property.ShortText({
        displayName: 'Name',
        required: false
    })
  },
  sampleData: {
    "active": true,
    "api_key_id": "9137496d-2088-4fd4-8af4-1ed8f2545521",
    "name": "Space Application",
    "descriptions": "API Developer Application for cosmic integrations"
  },
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const target: any = {
        api_key_id: context.propsValue.api_key_id,
        description: context.propsValue.description,
        name: context.propsValue.name,
        active: context.propsValue.active
    }

    const webhook = await createCommon.subscribeWebhook(context.auth, {
        event: 'APPLICATIONS.CREATED',
        target: target,
        webhookUrl: context.webhookUrl
    });
    await context.store.put(`_create_application_trigger`, webhook);
  },
  async onDisable(context) {
    // const webhook = await context.store.get<WebhookInformation>(`_create_application_trigger`);

    // if (webhook) {
    //     await createCommon.unsubscribeWebhook(context.auth, webhook.name);
    // }
  },
  async run(context) {
    return [context.payload.body];
  },
});
