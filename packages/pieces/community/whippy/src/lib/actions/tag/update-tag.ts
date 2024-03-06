/**
Update Tag Action

This action updates a tag in Whippy. Tag ID is required. 

API Documentation: https://docs.whippy.ai/reference/updatetag
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";


export const updateTag = createAction({
  name: 'update_tag', 
  auth: appAuth,
  displayName: 'Update Tag',
  description: 'Update Tag',
  props: {
    getTagId: Property.ShortText({
      displayName: 'Tag ID',
      required: true,
    }),
    getColor: Property.ShortText({
      displayName: 'Hex color code for tag',
      required: false,
    }),
    getName: Property.LongText({
      displayName: 'Tag Name',
      required: false,
    }), 
    getState: Property.StaticDropdown({
        displayName: 'Tag State',
        required: false,
        options: {
            options: [
                {
                    label: 'archived',    
                    value: 'archived'
                },
                {
                    label: 'active',
                    value: 'active'
                }
            ]
        }
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const id = context.propsValue['getTagId'];
    const color = context.propsValue['getColor'];
    let name = context.propsValue['getName'];
    const state = context.propsValue['getState'];

    if(name !== undefined)
    {
        name = name.replace(/\s+/g,' ').trim()
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
        url: `tags/${id}`,
        method: 'PUT',
        apiKey: apiKey,
        body: {
          color,
          name,
          state
        },
      })
      if (response?.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to update tag: ${error}`);
    }
  }
});