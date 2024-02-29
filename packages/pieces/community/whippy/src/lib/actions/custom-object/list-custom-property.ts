/**
List Custom Property Values Action

This action lists a custom property values in Whippy.

API Documentation: https://docs.whippy.ai/reference/listcustompropertyvalues
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { CustomObject } from "../../api/api";

export const listCustomPropertyValues = createAction({
    name: 'list_custom_property_values',
    auth: appAuth,
    displayName: 'List Custom Property Values',
    description: 'List Custom Property Values',
    props: {
        getCusId: Property.ShortText({
            displayName: 'Custom ID',
            required: false,
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
        getBefore: Property.DateTime({
            displayName: 'Before',
            required: false,
            description: 'The date and time before which the custom property values were last updated'
        }),
        getAfter: Property.DateTime({
            displayName: 'After',
            required: false,
            description: 'The date and time after which the custom property values were last updated'
        }),
    },
    async run(context) {
        const apiKey = context.auth;
        const customId = context.propsValue['getCusId'] || '36b720b0-a79f-4bb9-82b1-a22acf5b14ad';
        const limit = context.propsValue['getLimit'] || 50;
        const offset = context.propsValue['getOffset'] || 0;
        const associatedId = context.propsValue['getAssociatedId'] || '423b2341-24d8-4577-b149-1170a662047f';
        const resourceType = context.propsValue['getResourceType'] || 'contact';
        const before = context.propsValue['getBefore'] || '2022-11-03T00:00:00Z';
        const after = context.propsValue['getAfter'] || '2022-11-03T00:00:00Z';

      try {
          const response = await CustomObject.listCustomProperty(apiKey, customId, limit, offset, associatedId, resourceType, before, after);
          if (response.success) {
            return response.data; 
          } else {
            console.error(response.message);
            return false;
          }
        } catch (error) {
            throw new Error(`Failed to list custom property: ${error}`);
        }
    },
});
