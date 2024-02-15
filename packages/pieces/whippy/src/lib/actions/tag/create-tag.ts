/**
Create Tag Action

This action creates a tag in Whippy. 

API Documentation: https://docs.whippy.ai/reference/createtag
*/

import { createAction, Property} from "@activepieces/pieces-framework";
import { Tag } from '../../api/api';
import { appAuth } from "../../../index";

export const createTag = createAction({
  name: 'create_tag', 
  auth: appAuth,
  displayName:'Create Tag',
  description: 'Create Tag',
  props: {
    // Properties to ask from the user, in this ask we will take number of
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
    const apiKey = context.auth;
    const name = context.propsValue['getName'] || '';   
    const colorCode = context.propsValue['getColor'];

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
        const response = await Tag.createTag(apiKey, name, colorCode);
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
