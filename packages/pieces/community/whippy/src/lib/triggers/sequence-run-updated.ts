import {
  TriggerStrategy,
  createTrigger,
} from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const sequenceRunUpdated = createTrigger({
  auth: appAuth,
  name: 'sequence_run_updated',
  displayName: 'sequence_run.updated',
  description: 'Triggers when a developer updated a sequence run',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'sequence_run.updated';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_sequence_run_updated_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_sequence_run_updated_trigger`
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
      id: 'f15d4795-a747-4d56-9109-6a5b4d18f295',
      status: 'finished',
      contact: {
        id: '147363b7-3ce5-445f-9193-27e96f1cf12d',
        name: 'Giovanni Torp',
        email: '',
        phone: '+13603094336',
      },
      channel_id: '70c9cc95-e78b-4acf-9079-b0531c1eeff3',
      created_at: '2023-11-02T14:03:45',
      updated_at: '2023-11-02T14:03:46',
      added_by_id: 1,
      sequence_id: 'e4a747a3-a290-48da-b671-d3cd591f920b',
      last_step_id: '20020b31-f015-4713-bd31-01fca79dbf0e',
      step_contacts: [
        {
          id: '8276e83f-21b1-4f16-b3a3-1a1a7c8e46f1',
          status: 'finished',
          step_id: '5137e2c4-fe04-4c55-8810-943b33fd0f72',
          clicked_link: false,
          unsubscribed: false,
          contact_messages: [
            {
              id: '580ddf5c-1b53-404b-92d1-d03fcacd1c6a',
              delivery_status: 'delivered',
              contact_id: '147363b7-3ce5-445f-9193-27e96f1cf12d',
              conversation_id: '6c26b6a5-3525-4a5e-b1b9-3f409b79ae7b',
              body: "I'm Batman!",
              attachments: [
                {
                  url: 'https://1.bp.blogspot.com/_J9PlRvGGXS8/Su46nKRk_wI/AAAAAAAABZQ/d73kC45JkGw/s400/batman-avatar-10.jpg',
                  content_type: 'image/png',
                },
              ],
            },
          ],
        },
        {
          id: '7fccfa0f-7397-4da3-9034-34cc14994ab0',
          status: 'finished',
          step_id: '20020b31-f015-4713-bd31-01fca79dbf0e',
          clicked_link: false,
          unsubscribed: false,
          contact_messages: [],
        },
      ],
    },
    event: 'sequence_run.updated',
    request_id: 'ba163eb8-dcd4-4b09-aa44-c4e53128aba2',
  },
});
