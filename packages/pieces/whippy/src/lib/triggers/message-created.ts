import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';

export const messageCreated = createTrigger({
  auth: appAuth,
  name: 'message_created',
  displayName: 'message.created',
  description: 'Triggers when a developer created a message',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const randomTag = 'message.created';
    console.log('webhook url', context.webhookUrl);
    const webhook = await exampleCommon.subscribeWebhook(
      'target',
      randomTag,
      context.webhookUrl,
      context.auth
    );

    console.log('webhook', webhook);
    await context.store.put(`_message_created_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(
      `_message_created_trigger`
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
      id: '5e09c7cc-27e8-4d91-89ee-4ea5bafaaa15',
      to: '+14244023931',
      body: 'Olá, Clark Kent, obrigado por enviar mensagens à Organização 1. Um membro de nossa equipe entrará em contato com você em breve neste número.',
      from: '+12183925232',
      step_id: '',
      language: '',
      direction: 'OUTBOUND',
      channel_id: 'be1ecaf2-9ce7-448c-8755-e5009ccc4345',
      contact_id: '8241b8e5-98a2-44d7-975b-15f5c2bf3cf4',
      created_at: '2023-08-24T10:05:18.432652Z',
      updated_at: '2023-08-24T10:05:18.432652Z',
      attachments: [],
      campaign_id: '',
      conversation_id: '742993a5-c9c6-4d7d-bf09-31417a1c04a9',
      delivery_status: 'pending',
      step_contact_id: '',
      translated_body: '',
      campaign_contact_id: '',
      translation_language: '',
    },
    event: 'message.created',
    request_id: '00552b38-d0e7-460f-9877-a7c8c8b2ff8c',
  },
});
