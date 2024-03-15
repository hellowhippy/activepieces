/**
Create Tag Action

This action creates a tag in Whippy. 

API Documentation: https://docs.whippy.ai/reference/createtag
*/

import { createAction, Property } from '@activepieces/pieces-framework';
import { callAPI } from '../../api/api';
import { appAuth } from '../../..';

export const createTag = createAction({
  name: 'create_tag', 
  auth: appAuth,
  displayName:'Create Tag',
  description: 'Create Tag',
  props: {
    getName: Property.LongText({
      displayName: 'Tag Name',
      required: false,
    }),
    getColor: Property.ShortText({
      displayName: 'Tag Color',
      required: false,
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const name = context.propsValue['getName'] || '';   
    const color = context.propsValue['getColor'];

    if(name !== undefined)
    {
      name.replace(/\s+/g,' ').trim()
    }
    function isValidHexColor(color: string) {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      return hexColorRegex.test(color);
    }
    if (color !== undefined)
    {
      if (isValidHexColor(color)) {
        console.log('Valid color code:', color);
      } else {
        console.error('Invalid color code:', color);
      }
    }

    try {
      const response = await callAPI({
        url: `tags`,
        method: 'POST',
        api_key: api_key,
        body: {
          name,
          color
        },
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to create tag: ${error}`);
    }
  },
});
