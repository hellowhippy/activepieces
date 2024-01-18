import { Property, TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";
import { appAuth } from "../../index";
import { listCommon } from "../common";

export const listApplications = createTrigger({
  auth: appAuth,
  name: 'list_applications',
  displayName: 'List Applications',
  description: 'Triggers when a developer list applications',
  props: {
    limit: Property.Number({
        displayName: 'Limit',
        required: false
    }),
    offset: Property.Number({
        displayName: 'Offset',
        required: false
    }),
    name: Property.ShortText({
        displayName: 'Name',
        required: false
    }),
    active: Property.StaticDropdown({
        displayName: 'Active',

required: false,
options: {
    options: [
        { label: "true", value: "true" },
        { label: "false", value: "false" }
    ]
}
})
},
sampleData: {
"limit": 50,
"offset": 0,
"name": "Space Application",
"active": true
},
type: TriggerStrategy.WEBHOOK,
async onEnable(context) {
const target: any = {
limit: context.propsValue.limit,
offset: context.propsValue.offset,
name: context.propsValue.name,
active: context.propsValue.active
}

const webhook = await listCommon.subscribeWebhook(context.auth, {
event: 'APPLICATIONS.LISTED',
target: target,
webhookUrl: context.webhookUrl
});
await context.store.put(`_list_applications_trigger`, webhook);
},
async onDisable(context) {
// const webhook = await context.store.get<WebhookInformation>(_list_applications_trigger);

// if (webhook) {
//     await listCommon.unsubscribeWebhook(context.auth, webhook.name);
// }
},
async run(context) {
return [context.payload.body];
  },
});