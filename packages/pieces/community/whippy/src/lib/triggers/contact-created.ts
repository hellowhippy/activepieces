import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const contactCreated = createTrigger({
  auth: appAuth,
  name: 'contact_created',
  displayName: 'contact.created',
  description: 'Triggers when a developer created a contact',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'contact.created';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_contact_created_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_contact_created_trigger`
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
      name: 'Kurt Vonnegut',
      email: 'kurtvonnegut@whippy.co',
      notes: [],
      phone: '+359884988384',
      state: 'open',
      blocked: false,
      last_name: 'Vonnegut',
      created_at: '2023-08-25T19:20:50.667125Z',
      first_name: 'Kurt',
      updated_at: '2023-08-25T19:20:50.667125Z',
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
    event: 'contact.created',
    request_id: 'bf49b5f7-e199-4d01-9c13-ae53d0f90b1a',
  },
});
