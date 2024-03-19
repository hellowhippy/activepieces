import {
  TriggerStrategy,
  createTrigger,
} from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const stepContactCreated = createTrigger({
  auth: appAuth,
  name: 'step_contact_created',
  displayName: 'step_contact.created',
  description: 'Triggers when a developer created a step contact',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'step_contact.created';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_step_contact_created_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_step_contact_created_trigger`
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
      id: '8276e83f-21b1-4f16-b3a3-1a1a7c8e46f1',
      status: 'active',
      contact: {
        id: '147363b7-3ce5-445f-9193-27e96f1cf12d',
        name: 'Giovanni Torp',
        email: null,
        phone: '+13603094336',
      },
      step_id: '5137e2c4-fe04-4c55-8810-943b33fd0f72',
      channel_id: '70c9cc95-e78b-4acf-9079-b0531c1eeff3',
      created_at: '2023-11-02T14:03:44Z',
      updated_at: '2023-11-02T14:03:44Z',
      added_by_id: 1,
      sequence_id: 'e4a747a3-a290-48da-b671-d3cd591f920b',
      clicked_link: false,
      scheduled_at: '2023-11-02T14:03:44.000000Z',
      unsubscribed: false,
      run_created_at: null,
      run_updated_at: null,
      contact_messages: [],
    },
    event: 'step_contact.created',
    request_id: 'e29dabb8-994f-4441-9394-04fbf7f4b7d8',
  },
});
