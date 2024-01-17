/**
Delete Tag Action

This action deletes a tag in Whippy. Tag ID is required. 

API Documentation: https://docs.whippy.ai/reference/deletetag
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Tag } from '../../api/api';

export const deleteTag = createAction({
  name: 'delete_tag', 
  auth: PieceAuth.None(),
  displayName: 'Delete Tag',
  description: 'Delete Tag',
  props: {
    // Properties to ask from the user
    getAPIKey: Property.ShortText({
      displayName: 'API Key',
      required: true,
    }),
    getTagId: Property.ShortText({
      displayName: 'Tag ID',
      required: true,
    }),
  },
  async run(context) {
    const apiKey = context.propsValue['getAPIKey'];
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
