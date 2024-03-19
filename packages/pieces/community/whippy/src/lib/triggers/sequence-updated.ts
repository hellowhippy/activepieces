import {
  TriggerStrategy,
  createTrigger,
} from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const sequenceUpdated = createTrigger({
  auth: appAuth,
  name: 'sequence_updated',
  displayName: 'sequence.updated',
  description: 'Triggers when a developer updated a sequence',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'sequence.updated';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_sequence_updated_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_sequence_updated_trigger`
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
      id: 'e4a747a3-a290-48da-b671-d3cd591f920b',
      type: 'sequential',
      steps: [
        {
          id: '5137e2c4-fe04-4c55-8810-943b33fd0f72',
          body: 'Step 1',
          title: 'Step 1',
          status: 'active',
          position: 0,
          analytics: {
            responses: 0,
            link_clicks: 0,
            unsubscribes: 0,
            sent_messages: 0,
            slated_messages: 0,
            failed_deliveries: 0,
          },
          attachments: [],
          sequence_id: 'e4a747a3-a290-48da-b671-d3cd591f920b',
          schedule_options: {
            days: '0',
            hours: '0',
            minutes: '0',
            timezone: 'America/Detroit',
          },
        },
      ],
      title: 'Sequence',
      status: 'active',
      industry: '',
      settings: {
        max_time: '',
        on_re_add: 'include',
        on_response: 'remove',
        max_add_time: 86400,
        max_add_per_time: 86400,
        skip_sending_on_weekend: {
          enabled: true,
          use_contact_timezone: true,
        },
        support_sms_quiet_hours: {
          enabled: false,
          use_contact_timezone: true,
        },
        max_contact_sequence_runs: 5,
        only_send_during_business_hours: {
          enabled: false,
          use_contact_timezone: true,
        },
      },
      created_at: '2023-11-02T14:02:13',
      updated_at: '2023-11-02T14:02:48',
      description: 'Sequence',
      access_level: 'organization',
    },
    event: 'sequence.updated',
    request_id: '5c3c2f26-6421-4894-abbf-b0a78ae6151e',
  },
});
