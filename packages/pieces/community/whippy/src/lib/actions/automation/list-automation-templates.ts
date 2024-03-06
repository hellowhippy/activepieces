/**
  List Automation Templates Action
  This action list automation template in Whippy. 
  API Documentation: https://docs.whippy.ai/reference/getautomationtemplates
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";


export const listAutomation = createAction({
  name: 'list_automation', 
  auth: appAuth,
  displayName: 'List Automation',
  description: 'List Automation',
  props: {
    getLimit: Property.Number({
      displayName: 'Limit',
      required: false,
    }),
    getOffset: Property.Number({
      displayName: 'Offset',
      required: false,
    }),
    getTitle: Property.ShortText({
      displayName: 'Title',
      required: false,
    }), 
    getArchived: Property.StaticDropdown({
      displayName: 'Archived',
      required: false,
      options: {
        options: [
          {
              label: 'true',    
              value: '1'
          },
          {
              label: 'false',
              value: '0'
          },
        ]
      }
    }),
    getAccessLevel: Property.ShortText({
      displayName: 'Access Level',
      required: false,
    }),
    getCreatedBy: Property.Array({
      displayName: 'Created by User IDs',
      required: false,
    }),
    getUpdatedBy: Property.Array({
      displayName: 'Updated By User IDs',
      required: false,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const limit = context.propsValue['getLimit'] || 50;
    const offset = context.propsValue['getOffset'] || 0;
    const title = context.propsValue['getTitle'] || "";
    const archived = context.propsValue['getArchived'];
    const access_level = context.propsValue['getAccessLevel'];
    const created_by = context.propsValue['getCreatedBy'];
    const updated_by = context.propsValue['getUpdatedBy'];

    try {
      const response = await callAPI({
        url: "automations/templates",
        method: 'POST',
        apiKey: apiKey,
        body : {},
        params: {
          limit,
          offset,
          title,
          archived, 
          access_level,
          created_by: [created_by],
          updated_by: [updated_by]
        },
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to list automation templates: ${error}`);
    }
  }
});
