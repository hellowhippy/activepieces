/**
Show Organization Action

This action shows a organization in Whippy.

API Documentation: https://docs.whippy.ai/reference/getorganization
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Organization } from "../../api/api";

export const showOrganization = createAction({
    name: 'show_organization',
    auth: PieceAuth.None(),
    displayName: 'Show Organization',
    description: 'Show Organization',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
    },
    async run(context) {
      const apiKey = context.propsValue['getAPIKey'];

      try {
          const response = await Organization.showOrganization(apiKey);
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
