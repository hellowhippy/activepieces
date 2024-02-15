/**
Delete Tag Action

This action deletes a tag in Whippy. Tag ID is required. 

API Documentation: https://docs.whippy.ai/reference/deletetag
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { Tag } from '../../api/api';
import { appAuth } from "../../../index";

export const deleteTag = createAction({
  name: 'delete_tag', 
  auth: appAuth,
  displayName: 'Delete Tag',
  description: 'Delete Tag',
  props: {
    // Properties to ask from the user
    getTagId: Property.ShortText({
      displayName: 'Tag ID',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.auth;
    const tagId = context.propsValue['getTagId'];

    try {
      const response = await Tag.deleteTag(apiKey, tagId);
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
