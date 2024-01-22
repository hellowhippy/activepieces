import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { updateCommon } from "../../common";
import { nanoid } from "nanoid";
import { getAccessTokenOrThrow } from "@activepieces/pieces-common";

export const updateApplication = createTrigger({
  auth: appAuth,
  name: 'update_application',
  displayName: 'Update Application',
  description: 'Triggers when a developer updated developer application',
  props: {
    id: Property.ShortText({
        displayName: 'Developer Application ID',
        required: true
    }),
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
    "id": "97c60354-3dc0-4822-8582-be03339b6ffe",
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
      const randomTag = `update_developer_application_${nanoid()}`;
      await updateCommon.subscribeWebhook(
        context.propsValue.id,
        target,
        randomTag,
        context.webhookUrl,
        getAccessTokenOrThrow(context.auth)
      );
      await context.store?.put<WebhookInformation>('_update_application_trigger', {
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
        '_update_application_trigger'
      );
      if (response !== null && response !== undefined) {
          await updateCommon.unsubscribeWebhook(
            context.propsValue.id,
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
  