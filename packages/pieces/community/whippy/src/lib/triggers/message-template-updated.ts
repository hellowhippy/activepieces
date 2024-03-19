import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const templateUpdated = createTrigger({
  auth: appAuth,
  name: 'message_template_updated',
  displayName: 'message_template.updated',
  description: 'Triggers when a developer updated a message template',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'message_template.updated';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_message_template_updated_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_message_template_updated_trigger`
    );

    if (webhook) {
      await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
    }
  },
  async run(context) {
    return [context.payload.body];
  },
  sampleData: {
    data: {
      id: 'bb2df9dd-5d46-4488-80a5-df1e278553ac',
      title: 'Whippy Message Template',
      message: "Don't Panic.",
      created_at: '2023-09-26T15:55:43.771415Z',
      updated_at: '2023-09-26T15:55:53.433021Z',
      attachments: [],
      channel_ids: [],
      access_level: 'organization',
      created_by_id: 42,
      updated_by_id: 84,
      organization_id: 'be1ecaf2-9ce7-448c-8755-e5009ccc4345',
    },
    event: 'message_template.updated',
    request_id: '9159ae38-5558-43d9-ace8-dccc5112a4fb',
  },
});
