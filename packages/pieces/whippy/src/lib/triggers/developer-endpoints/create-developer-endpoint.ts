import { createTrigger, Property, StaticPropsValue, TriggerStrategy } from "@activepieces/pieces-framework";
import { DedupeStrategy, HttpMethod, Polling, pollingHelper } from "@activepieces/pieces-common";
import dayjs from "dayjs";
import { whippyAuth } from "../../..";
import { callwhippyapi } from "../../common";

const props = {
    app_id: Property.ShortText({
        displayName: "Developer Application ID",
        required: false
    }),
    active: Property.StaticDropdown({
        displayName: "Active",
        required: false,
        options: {
            options: [
              { label: "true", value: "true" },
              { label: "false", value: "false" }
            ]
        }
    }),
    eventTypes: Property.Array({
        displayName: "Event Types",
        required: false,
        description: "List of subscribed event types to receive webhooks for"
    }),
    url: Property.ShortText({
        displayName: "URL for the Developer Endpoint",
        required: false
    })
}

export const createDeveloperEndpoint = createTrigger({
    auth: whippyAuth,
    name: 'create_developer_endpoint',
    displayName: 'Create Developer Endpoint',
    description: 'Triggers when a developer endpoint is created',
    props,
    sampleData: {
        "active": true,
        "developer_application_id": "e70fe9d8-ad31-43df-84a5-c470909c0a1a",
        "event_types": [
            "message.created",
            "campaign.created",
            "lead.new"
        ],
        "method": "POST",
        "url": "https://www.spacetravel.com/webhooks"
    },
    type: TriggerStrategy.POLLING,
    async test(context) {
        const { store, auth, propsValue } = context
        return await pollingHelper.test(polling, { store, auth, propsValue });
    },
    async onEnable(context) {
        const { store, auth, propsValue } = context
        await pollingHelper.onEnable(polling, { store, auth, propsValue });
    },

    async onDisable(context) {
        const { store, auth, propsValue } = context
        await pollingHelper.onDisable(polling, { store, auth, propsValue });
    },

    async run(context) {
        const { store, auth, propsValue } = context
        return await pollingHelper.poll(polling, { store, auth, propsValue });
    },
});


const polling: Polling<string, StaticPropsValue<typeof props> > = {
    strategy: DedupeStrategy.TIMEBASED,
    items: async ({ auth, lastFetchEpochMS, propsValue }) => {
        const currentValues = await callwhippyapi<{
            data: {
                active: string,
                created_at: string,
                developer_application_id: string,
                url: string,
                event_types: string[],
            }[]
        }>(HttpMethod.POST, `developers/endpoints`, auth, propsValue);

        const createEndpoint = currentValues.body;
        const create = createEndpoint.data;
        return create.map((item) => {
            return {
                epochMilliSeconds: dayjs(item.created_at).valueOf(),
                data: item,
            }
        });
    }
};
