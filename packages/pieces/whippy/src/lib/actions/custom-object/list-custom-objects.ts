/**
List Custom Objects Action

This action lists a custom objects in Whippy.

API Documentation: https://docs.whippy.ai/reference/listcustomobjects
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";

export const listCustomObjects = createAction({
    name: 'list_custom_objects',
    auth: PieceAuth.None(),
    displayName: 'List Custom Objects',
    description: 'List Custom Objects',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getLimit: Property.Number({
            displayName: 'Limit',
            required: false,
        }),
        getOffset: Property.Number({
            displayName: 'Offset',
            required: false,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const limit = context.propsValue['getLimit'];
        const offset = context.propsValue['getOffset'];

      try {
          const response = await CustomObject.listCustomObjects(apiKey, limit, offset);
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
