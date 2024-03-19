import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const campaignCreated = createTrigger({
  auth: appAuth,
  name: 'campaign_created',
  displayName: 'campaign.created',
  description: 'Triggers when a developer created a campaign',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'campaign.created';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_campaign_created_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_campaign_created_trigger`
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
      id: '44c0f2d4-6085-440f-b5c2-bedf0ccf33b6',
      body: '',
      title: 'Whippy Campaign',
      status: 'draft',
      created_at: '2023-09-26T15:54:48.951970Z',
      updated_at: '2023-09-26T15:54:48.951970Z',
      attachments: [],
      schedule_at: '',
    },
    event: 'campaign.created',
    request_id: 'd12a349e-c530-4175-8a90-65c8ed284243',
  },
});
