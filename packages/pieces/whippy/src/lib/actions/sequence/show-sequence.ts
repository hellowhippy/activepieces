/**
Show Sequence Action

This action Returns information about a specific sequence.

API Documentation: https://docs.whippy.ai/reference/getsequence
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Sequence } from "../../api/api";

export const showSequences = createAction({
    name: 'show_sequences', 
    auth: appAuth,
    displayName: 'Show Sequences',
    description: 'Show Sequences',
    props: {
        getSequenceId: Property.ShortText({
          displayName: 'Sequence ID',
          required: true,
        }),
      },
    async run(context) {
        const apiKey = context.auth;
        const sequenceId = context.propsValue['getSequenceId'];

        try {
            const response = await Sequence.showSequence(apiKey , sequenceId);
            if (response.success) {
                return response.data; 
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            throw new Error(`Failed to show sequence: ${error}`);
        }
    },
});
