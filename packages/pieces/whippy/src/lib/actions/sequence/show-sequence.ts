/**
Show Sequence Action

This action Returns information about a specific sequence.

API Documentation: https://docs.whippy.ai/reference/getsequence
*/

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { Sequence } from "../../api/api";
import { appAuth } from '../../../index';

export const showSequences = createAction({
    name: 'show_sequences', 
    auth: appAuth,
    displayName: 'Show Sequences',
    description: 'Show Sequences',
    props: {
        // Properties to ask from the user
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
            console.error(error);
            return false;
        }
    },
});
