/**
List Tags Action

This action list tags in Whippy. 

API Documentation: https://docs.whippy.ai/reference/gettags
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { callAPI } from '../../api/api';
import { appAuth } from '../../..';

export const listTags = createAction({
  name: 'list_tags', 
  auth: appAuth,
  displayName:'List Tags',
  description: 'List Tags',
  props: {
    getLimit: Property.Number({
      displayName: 'Limit',
      required: false,
    }),
    getOffset: Property.Number({
      displayName: 'Offset',
      required: false,
    }),
    getSearch: Property.LongText({
      displayName: 'Search by Tag Name',
      required: false,
    }),
    getState: Property.ShortText({
      displayName: 'State',
      required: false,
    }),
    getSystem: Property.StaticDropdown({
      displayName: 'System',
      required: false,
      options: { 
        options: [
          { 
            label: 'true',
            value: 'system'
          },
          { 
            label: 'false',
            value: 'non system'
          }
        ]
      }
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const limit = context.propsValue['getLimit'] || 50;
    const offset = context.propsValue['getOffset'] || 0;
    const search = context.propsValue['getSearch'];
    const state = context.propsValue['getState'];
    const system = context.propsValue['getSystem'];

    if(state !== "active" && state !== "achieved")
    {
      console.log("Tag state can be either 'active' or 'achieved'");
    }

    let params = `limit=${limit}`;
    if(offset) {
      params += `&offset=${offset}`;
    }
    if(search) {
      params += `&search=${search}`;
    }
    if(state) {
      params += `&state=${state}`;
    }
    if(system) {
      params += `&system=${system}`;
    }

    try {
      const response = await callAPI({
        url: `tags?${params}`,
        method: 'GET',
        api_key: api_key,
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to list tags: ${error}`);
    }
  },
});
