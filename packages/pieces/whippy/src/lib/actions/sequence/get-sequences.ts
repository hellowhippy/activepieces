/**
Get Sequence Action

This action Lists sequences for an organization based on filters.

API Documentation: https://docs.whippy.ai/reference/getsequences
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Sequence } from "../../api/api";
import { appAuth } from "../../../index";

export const getSequences = createAction({
    name: 'get_sequences', 
    auth: appAuth,
    displayName: 'Get Sequences',
    description: 'Get Sequences',
    props: {
        // Properties to ask from the user
        limit: Property.Number({
          displayName: 'Limit',
          required: false,
          defaultValue: 50, // You can adjust the default value
        }),
        offset: Property.Number({
          displayName: 'Offset',
          required: false,
          defaultValue: 0, // You can adjust the default value
        }),
        title: Property.ShortText({
          displayName: 'Title',
          required: false,
        }),
      },
    async run(context) {
        const apiKey = context.auth;
        const limit = context.propsValue['limit'];
        const offset = context.propsValue['offset'];
        const title = context.propsValue['title'];

        try {
            const response = await Sequence.getSequences(apiKey , offset || 0 , limit ||  50 , title || "");
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
