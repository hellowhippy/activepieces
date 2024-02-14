/**
Update Tag Action

This action updates a tag in Whippy. Tag ID is required. 

API Documentation: https://docs.whippy.ai/reference/updatetag
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Tag } from '../../api/api';
import { appAuth } from "../../../index";

export const updateTag = createAction({
  name: 'update_tag', 
  auth: appAuth,
  displayName: 'Update Tag',
  description: 'Update Tag',
  props: {
    // Properties to ask from the user
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
    const tagId = context.propsValue['getTagId'];
    const colorCode = context.propsValue['getColor'];
    const name = context.propsValue['getName'];
    const state = context.propsValue['getState'];

    if(name !== undefined)
    {
        name.replace(/\s+/g,' ').trim()
    }
    function isValidHexColor(color: string) {
        const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
        return hexColorRegex.test(color);
    }
    if (colorCode !== undefined)
    {
        if (isValidHexColor(colorCode)) {
            console.log('Valid color code:', colorCode);
        } else {
            console.error('Invalid color code:', colorCode);
        }
    }

    try {
      const response = await Tag.udpateTag(apiKey, tagId, colorCode, name, state);
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
  }
});
