/**
List Custom Property Values Action

This action lists a custom property values in Whippy.

API Documentation: https://docs.whippy.ai/reference/listcustompropertyvalues
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { CustomObject } from "../../api/api";
import { appAuth } from "../../../index";

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
            displayName: '50',
            required: false,
        }),
        getOffset: Property.Number({
            displayName: '0',
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
        const customId = context.propsValue['getCusId'];
        const limit = context.propsValue['getLimit'];
        const offset = context.propsValue['getOffset'];
        const associatedId = context.propsValue['getAssociatedId'];
        const resourceType = context.propsValue['getResourceType'];
        const before = context.propsValue['getBefore'];
        const after = context.propsValue['getAfter'];

      try {
          const response = await CustomObject.listCustomProperty(apiKey, customId, limit, offset, associatedId, resourceType, before, after);
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
