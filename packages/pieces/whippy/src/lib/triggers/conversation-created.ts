import { TriggerStrategy, createTrigger, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../..";
import { WebhookInform, exampleCommon } from "../common";

export const conversationCreated = createTrigger({
    auth: appAuth,
    name: 'conversation_created',
    displayName: 'conversation.created',
    description: 'Triggers when a developer created a conversation',
    props: {
        assignedUser: Property.Number({
            displayName: 'Assigned user ID',
            required: false,
        }),
        status: Property.Dropdown({
            displayName: 'Status',
            description: 'Conversation status',
            required: false,
            options: async () => {
                return {
                    disabled: false,
                    options: [
                        {
                            label: 'open',
                            value : 'open',
                        },
                        {
                            label : 'closed',
                            value : 'closed',
                        },
                        {
                            label: 'spam',
                            value: 'spam',
                        }
                    ],
                    defaultValue: ' ',
                };
            },
            refreshers: []
        }),
        unreadCount: Property.Number({
            displayName: "Unread Count",
            required: false,
        })
    },
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const target: any = {
            assigned_user: context.propsValue.assignedUser,
            status: context.propsValue.status,
            unread_count: context.propsValue.unreadCount
        }
        const randomTag = 'conversation.created';
        const webhook = await exampleCommon.subscribeWebhook(
            target,
            randomTag,
            context.webhookUrl,
            context.auth
        );
        await context.store.put(`_conversation_created_trigger`, webhook);
    },
    async onDisable(context) {
        const webhook = await context.store.get<WebhookInform>(`_conversation_created_trigger`);

        if (webhook) {
            await exampleCommon.unsubscribeWebhook(context.auth, webhook.id);
        }
    },
    async run(context) {
        return [context.payload.body];
    },
    sampleData: {
        data: {
            "id":"81f291d7-3693-4100-96f1-9957faceebfe",
            "status":"open",
            "language":"en",
            "channel_id":"029f876c-e60f-454b-8e51-4c38f0484140",
            "contact_id":"db737fac-9b54-48ba-9fdc-7db30f907fab",
            "created_at":"2023-09-08T13:55:10.584156Z",
            "updated_at":"2023-09-08T13:55:10.584156Z",
            "channel_type":"phone",
            "unread_count":0,
            "assigned_team_id":'',
            "assigned_user_id":'',
            "contact_language":"en",
            "last_message_date":''
        },
        "event":"conversation.created",
        "request_id":"13d0abf8-e54e-4bf0-a645-f7ff68c703a4"
    },
});
