import { createTrigger, Property, TriggerStrategy } from "@activepieces/pieces-framework";
import { DedupeStrategy, HttpMethod, Polling, pollingHelper } from "@activepieces/pieces-common";
import dayjs from "dayjs";
import { whippyAuth } from "../../..";
import { callwhippyapi } from "../../common";


export const showDeveloperEndpoint = createTrigger({
    auth: whippyAuth,
    name: 'show_developer_endpoint',
    displayName: 'Show Developer Endpoint',
    description: 'Triggers when a developer endpoint is showed',
    props: {
        id: Property.ShortText({
            displayName: "Developer Endpoint ID",
            required: true
        })
    },
    sampleData: {
        "id": "9ed8ddd9-be79-4853-9957-c16fafd41341"
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

const polling: Polling<string, { id: string }> = {
    strategy: DedupeStrategy.TIMEBASED,
    items: async ({ auth, lastFetchEpochMS, propsValue }) => {
        const id = propsValue.id;
        const currentValues = await callwhippyapi<{
            data: {
                id: string,
                created_at: string,
            }[]
        }>(HttpMethod.GET, `developers/endpoints/${id}`, auth, undefined);

        const showEndpoint = currentValues.body;
        const show = showEndpoint.data;
        return show.map((item) => {
            return {
                epochMilliSeconds: dayjs(item.created_at).valueOf(),
                data: item,
            }
        });
    }
};