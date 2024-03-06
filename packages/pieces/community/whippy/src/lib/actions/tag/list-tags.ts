/**
List Tags Action

This action list tags in Whippy. 

API Documentation: https://docs.whippy.ai/reference/gettags
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";

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
    getSystem: Property.StaticDropdown({ //Add boolean type and set the code acoording to the type
        displayName: ' ',
        required: false,
        options: { options: [{ label: 'true', value: 'system' }, { label: 'false', value: 'non system' }] }
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const limit = context.propsValue['getLimit'];
    const offset = context.propsValue['getOffset'];
    const search = context.propsValue['getSearch'];
    const state = context.propsValue['getState'];
    const system = context.propsValue['getSystem'];

    if(state !== "active" && state !== "achieved")
    {
      console.log("Tag state can be either 'active' or 'achieved'");
    }

    try {
        const response = await callAPI({
          url: "tags",
          method: 'GET',
          apiKey: apiKey,
          body : {},
          params: {
            limit,
            offset,
            search,
            state,
            system
          },
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
