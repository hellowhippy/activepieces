/**
Delete Tag Action

This action deletes a tag in Whippy. Tag ID is required. 

API Documentation: https://docs.whippy.ai/reference/deletetag
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { callAPI } from '../../api/api';
import { appAuth } from "../../..";

export const deleteTag = createAction({
  name: 'delete_tag', 
  auth: appAuth,
  displayName: 'Delete Tag',
  description: 'Delete Tag',
  props: {
    getTagId: Property.ShortText({
      displayName: 'Tag ID',
      required: true,
    }),
  },
  async run(context) {
    const api_key = context.auth;
    const id = context.propsValue['getTagId'];

    try {
      const response = await callAPI({
        url: `tags/${id}`,
        method: 'DELETE',
        api_key: api_key
      })
      if (response.success) {
        return response?.data; 
      } else {
        console.error(response?.message);
        return response?.message;
      }
    } catch (error) {
      throw new Error(`Failed to delete tag: ${error}`);
    }
  }
});
