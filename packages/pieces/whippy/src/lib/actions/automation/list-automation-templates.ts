/**
List Automation Templates Action

This action list automation template in Whippy. 

API Documentation: https://docs.whippy.ai/reference/getautomationtemplates
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Automation } from '../../api/api';
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
      displayName: 'Created by',
      description: 'Created by user IDs',
      required: false,
    }),
    getUpdatedBy: Property.Array({
      displayName: 'Updated By',
      description: 'Updated by user IDs',
      required: false,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const limit = context.propsValue['getLimit'] || 50;
    const offset = context.propsValue['getOffset'] || 0;
    const title = context.propsValue['getTitle'] || "";
    const archived = context.propsValue['getArchived'];
    const accessLevel = context.propsValue['getAccessLevel'];
    const createdBy = context.propsValue['getCreatedBy'];
    const updatedBy = context.propsValue['getUpdatedBy'];

    try {
      const response = await Automation.listAutomation(apiKey, limit, offset, title, archived, accessLevel,
        createdBy, updatedBy);
      if (response.success) {
        return response.data; 
      } else {
        console.error(response.message);
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to list automation templates: ${error}`);
    }
  }
});
