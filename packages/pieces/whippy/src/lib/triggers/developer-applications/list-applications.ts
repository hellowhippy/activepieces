import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { listCommon } from "../../common";
import { nanoid } from "nanoid";
import { getAccessTokenOrThrow } from "@activepieces/pieces-common";

export const listApplications = createTrigger({
  auth: appAuth,
  name: 'list_applications',
  displayName: 'List Applications',
  description: 'Triggers when a developer list applications',
  props: {
    limit: Property.Number({
        displayName: 'Limit',
        required: false
    }),
    offset: Property.Number({
        displayName: 'Offset',
        required: false
    }),
    name: Property.ShortText({
        displayName: 'Name',
        required: false
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
    })
  },
  sampleData: {
    "limit": 50,
    "offset": 0,
    "name": "Space Application",
    "active": true
  },
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const target: any = {
        limit: context.propsValue.limit,
        offset: context.propsValue.offset,
        name: context.propsValue.name,
        active: context.propsValue.active
    }
    const randomTag = `list_developer_application_${nanoid()}`;
    if (target.limit !== null && target.limit !== undefined && 
      target.offset !== null && target.offset !== undefined &&
      target.name !== null && target.name !== undefined &&
      target.active !== null && target.active !== undefined) {
      await listCommon.subscribeWebhook(
        target.limit?.toString(),
        target.offset?.toString(),
        target.name,
        target.active,
        randomTag,
        context.webhookUrl,
        getAccessTokenOrThrow(context.auth)
      );
      await context.store?.put<WebhookInformation>('_list_application_trigger', {
          tag: randomTag,
      });
    }
  },
  async onDisable(context) {
    const target: any = {
      limit: context.propsValue.limit,
      offset: context.propsValue.offset,
      name: context.propsValue.name,
      active: context.propsValue.active
    }
    const response = await context.store?.get<WebhookInformation>(
      '_list_application_trigger'
    );
    if (response !== null && response !== undefined) {
        await listCommon.unsubscribeWebhook(
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
