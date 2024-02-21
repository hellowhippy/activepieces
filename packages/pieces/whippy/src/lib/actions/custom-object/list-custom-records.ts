/**
List Custom Object Records Action

This action lists a custom object records in Whippy.

API Documentation: https://docs.whippy.ai/reference/listcustomobjectrecords
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { CustomObject } from "../../api/api";

export const listCustomObjectRecords = createAction({
    name: 'list_custom_object_records',
    auth: appAuth,
    displayName: 'List Custom Object Records',
    description: 'List Custom Object Records',
    props: {
        getCusId: Property.ShortText({
            displayName: 'Custom ID',
            required: true,
        }),
        getAssociatedId: Property.ShortText({
            displayName: 'Associated Resource ID',
            required: false,
        }),
        getResourceType: Property.ShortText({
            displayName: 'Associated Resource Type',
            required: false,
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
        const apiKey = context.auth;
        const customId = context.propsValue['getCusId'];
        const limit = context.propsValue['getLimit'];
        const offset = context.propsValue['getOffset'];
        const associatedId = context.propsValue['getAssociatedId'];
        const resourceType = context.propsValue['getResourceType'];

      try {
          const response = await CustomObject.listCustomRecords(apiKey, customId, limit, offset, associatedId, resourceType);
          if (response.success) {
            return response.data; 
          } else {
            console.error(response.message);
            return false;
          }
        } catch (error) {
            throw new Error(`Failed to list custom records: ${error}`);
        }
    },
});
