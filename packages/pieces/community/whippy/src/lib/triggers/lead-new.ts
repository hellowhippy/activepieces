import {
  TriggerStrategy,
  createTrigger,
} from '@activepieces/pieces-framework';
import { appAuth } from '../..';
import { WebhookInform, exampleCommon } from '../common';

export const leadNew = createTrigger({
  auth: appAuth,
  name: 'lead_new',
  displayName: 'lead.new',
  description: 'Triggers when a developer a new lead',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const event = 'lead.new';
    const webhook = await exampleCommon.subscribeWebhook(
      event,
      context.webhookUrl,
      context.auth
    );
    await context.store.put(`_lead_new_trigger`, webhook);
  },
  async onDisable(context) {
    const webhook = await context.store.get<WebhookInform>(`_lead_new_trigger`);

    if (webhook) {
      await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
    }
  },
  async run(context) {
    return [context.payload.body];
  },
  sampleData: {
    data: {
      contact: {
        id: 'db737fac-9b54-48ba-9fdc-7db30f907fab',
        name: 'Bruce Wayne',
        email: 'brucewayne@whippy.co',
        notes: [],
        phone: '+14244023950',
        state: 'open',
        blocked: false,
        last_name: 'Wayne',
        created_at: '2023-09-08T13:55:10.321386Z',
        first_name: 'Bruce',
        updated_at: '2023-09-08T13:55:10.321386Z',
        contact_tags: [],
        communication_preferences: [],
      },
      conversation: {
        id: '81f291d7-3693-4100-96f1-9957faceebfe',
        status: 'open',
        language: 'en',
        channel_id: '029f876c-e60f-454b-8e51-4c38f0484140',
        contact_id: 'db737fac-9b54-48ba-9fdc-7db30f907fab',
        created_at: '2023-09-08T13:55:10.584156Z',
        updated_at: '2023-09-25T12:35:06.836746Z',
        channel_type: 'phone',
        unread_count: 3,
        assigned_team_id: '',
        assigned_user_id: 2,
        contact_language: '',
        last_message_date: '2023-09-25T12:35:06.864042Z',
      },
      inbound_message: {
        id: '9fa49dda-ef4e-4992-a44d-1720365d59c2',
        to: '+14244023933',
        body: 'Hello from the Moon!',
        from: '+14244023950',
        step_id: '',
        language: '',
        direction: 'INBOUND',
        channel_id: '029f876c-e60f-454b-8e51-4c38f0484140',
        contact_id: 'db737fac-9b54-48ba-9fdc-7db30f907fab',
        created_at: '2023-09-25T12:35:25.703841Z',
        updated_at: '2023-09-25T12:35:25.703841Z',
        attachments: [],
        campaign_id: '',
        sequence_id: '',
        conversation_id: '81f291d7-3693-4100-96f1-9957faceebfe',
        delivery_status: 'webhook_delivered',
        step_contact_id: '',
        translated_body: '',
        campaign_contact_id: '',
        translation_language: '',
      },
    },
    event: 'lead.new',
    request_id: 'c9f6725e-a0d3-4f94-825a-792b0839a97a',
  },
});
