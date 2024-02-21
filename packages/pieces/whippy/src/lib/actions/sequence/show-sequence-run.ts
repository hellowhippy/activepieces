/**
Show Sequence Run Action

This action Get a single sequence run based on the sequence id and the sequence run id.

API Documentation: https://docs.whippy.ai/reference/getsinglesequencerun
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Sequence } from "../../api/api";

export const showSequenceRun = createAction({
    name: 'show_sequence_run', 
    auth: appAuth,
    displayName: 'Show Sequences Run',
    description: 'Show Sequences Run',
    props: {
        getSequenceId: Property.ShortText({
          displayName: 'Sequence ID',
          required: true,
        }),
        getSequenceRunId : Property.ShortText({
            displayName : 'Sequence Run ID',
            required: true,
        })
      },
    async run(context) {
        const apiKey = context.auth;
        const sequenceId = context.propsValue['getSequenceId'];
        const sequenceRunId = context.propsValue['getSequenceRunId'];

        try {
            const response = await Sequence.showSequenceRun(apiKey, sequenceId , sequenceRunId);
            if (response.success) {
                return response.data; 
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            throw new Error(`Failed to show sequence run: ${error}`);
        }
    },
});
