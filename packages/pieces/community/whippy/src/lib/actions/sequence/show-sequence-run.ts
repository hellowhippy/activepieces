/**
Show Sequence Run Action

This action Get a single sequence run based on the sequence id and the sequence run id.

API Documentation: https://docs.whippy.ai/reference/getsinglesequencerun
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { appAuth } from '../../..';
import { callAPI } from '../../api/api';

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
        const api_key = context.auth;
        const sequence_id = context.propsValue['getSequenceId'];
        const sequence_run_id = context.propsValue['getSequenceRunId'];

        try {
            const response = await callAPI({
                url: `sequences/${sequence_id}/sequence_runs/${sequence_run_id}`,
                method: 'GET',
                api_key: api_key
            })
            if (response?.success) {
                return response?.data; 
            } else {
                console.error(response?.message);
                return response?.message;
            }
        } catch (error) {
            throw new Error(`Failed to show sequence run: ${error}`);
        }
    },
});
