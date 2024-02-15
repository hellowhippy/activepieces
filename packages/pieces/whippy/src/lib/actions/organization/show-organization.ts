/**
Show Organization Action

This action shows a organization in Whippy.

API Documentation: https://docs.whippy.ai/reference/getorganization
*/

import { createAction } from "@activepieces/pieces-framework";
import { Organization } from "../../api/api";
import { appAuth } from "../../../index";

export const showOrganization = createAction({
    name: 'show_organization',
    auth: appAuth,
    displayName: 'Show Organization',
    description: 'Show Organization',
    props: {
    },
    async run(context) {
      const apiKey = context.auth;

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
