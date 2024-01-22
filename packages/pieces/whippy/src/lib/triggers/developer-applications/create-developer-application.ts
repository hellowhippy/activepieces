import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { createCommon } from "../../common";
import { getAccessTokenOrThrow } from "@activepieces/pieces-common";
import { nanoid } from "nanoid";

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
    const randomTag = `create_developer_application_${nanoid()}`;
    await createCommon.subscribeWebhook(
        target,
        randomTag,
        context.webhookUrl,
        getAccessTokenOrThrow(context.auth)
    );
    await context.store?.put<WebhookInformation>('_create_application_trigger', {
        tag: randomTag,
    });
  },
  async onDisable(context) {
    const target: any = {
      api_key_id: context.propsValue.api_key_id,
      description: context.propsValue.description,
      name: context.propsValue.name,
      active: context.propsValue.active
    }
    const response = await context.store?.get<WebhookInformation>(
      '_create_application_trigger'
    );
    if (response !== null && response !== undefined) {
        await createCommon.unsubscribeWebhook(
            target,
            response.tag,
            getAccessTokenOrThrow(context.auth)
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
