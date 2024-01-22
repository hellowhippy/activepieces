import { createTrigger, Property, StaticPropsValue, TriggerStrategy } from "@activepieces/pieces-framework";
import { DedupeStrategy, HttpMethod, Polling, pollingHelper } from "@activepieces/pieces-common";
import dayjs from "dayjs";
import { whippyAuth } from "../../..";
import { callwhippyapi } from "../../common";

const props = {
    limit: Property.Number({
        displayName: "Limit",
        required: false
    }),
    offset: Property.Number({
        displayName: "Offset",
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

export const listDeveloperEndpoints = createTrigger({
    auth: whippyAuth,
    name: 'list_developer_endpoints',
    displayName: 'List Developer Endpoints',
    description: 'Triggers when developer endpoints is listed',
    props,
    sampleData: {
        "limit": 50,
        "active": true,
        "offset": 0,
        "event_types": [
            "message.created",
            "campaign.created",
            "lead.new"
        ],
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
                limit: number,
                offset: number,
                url: string,
                event_types: string[],
            }[]
        }>(HttpMethod.GET, `developers/endpoints?limit=${propsValue.limit}&offset=${propsValue.offset}&
                            event_type=${propsValue.eventTypes}&url=${propsValue.url}&active=${propsValue.active}`, auth, undefined);

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
