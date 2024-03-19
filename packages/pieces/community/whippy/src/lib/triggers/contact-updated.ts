import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const contactUpdated = createTrigger({
  auth: appAuth,
  name: 'contact_updated',
  displayName: 'contact.updated',
  description: 'Triggers when a developer updated a contact',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'contact.updated';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_contact_updated_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_contact_updated_trigger`
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
      id: 'c6485e7c-b7ec-41e9-8a2b-fecdba0112d1',
      name: 'Kurt Vonnegut Jr',
      email: 'kurtvonnegutjr@whippy.co',
      notes: [],
      phone: '+359884988387',
      state: 'open',
      blocked: false,
      last_name: 'Vonnegut Jr',
      created_at: '2023-08-25T19:22:27.788176Z',
      first_name: 'Kurt',
      updated_at: '2023-08-25T19:22:27.788176Z',
      contact_tags: [],
      communication_preferences: [
        {
          id: 'b67993ac-ae2e-4e27-b679-b71f0789aa9f',
          opt_in: true,
          channel_id: '029f876c-e60f-454b-8e51-4c38f0484140',
          contact_id: 'c6485e7c-b7ec-41e9-8a2b-fecdba0112d1',
          created_at: '2023-08-25T19:20:50Z',
          updated_at: '2023-08-25T19:20:50Z',
          opt_in_date: '2023-08-25T19:20:50Z',
          opt_out_date: '',
          last_campaign_date: '',
        },
        {
          id: '728b996d-1bd9-4865-afeb-8b78c378a0df',
          opt_in: true,
          channel_id: 'be1ecaf2-9ce7-448c-8755-e5009ccc4345',
          contact_id: 'c6485e7c-b7ec-41e9-8a2b-fecdba0112d1',
          created_at: '2023-08-25T19:20:50Z',
          updated_at: '2023-08-25T19:20:50Z',
          opt_in_date: '2023-08-25T19:20:50Z',
          opt_out_date: '',
          last_campaign_date: '',
        },
      ],
    },
    event: 'contact.updated',
    request_id: 'c6610a5c-bb55-471d-b9cf-fb71f4f1348a',
  },
});
