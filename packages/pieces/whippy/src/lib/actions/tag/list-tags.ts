/**
List Tags Action

This action list tags in Whippy. 

API Documentation: https://docs.whippy.ai/reference/gettags
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Tag } from '../../api/api';

export const listTags = createAction({
  name: 'list_tags', 
  auth: PieceAuth.None(),
  displayName:'List Tags',
  description: 'List Tags',
  props: {
    // Properties to ask from the user, in this ask we will take number of
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
    const apiKey = context.propsValue['getAPIKey'];
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
        const response = await Tag.listTags(apiKey, limit, offset, search, state, system);
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
