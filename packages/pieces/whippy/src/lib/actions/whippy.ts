import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

export const getWhippyName = createAction({
	name: 'get_whippy_name', // Must be a unique across the piece, this shouldn't be changed.
  auth: PieceAuth.None(),
  displayName:'Get Whippy Name',
  description: 'Get Whippy Name',
	props: {
        // Properties to ask from the user, in this ask we will take number of
		get_whippy_name: Property.ShortText({
			displayName: 'Name Of Whippy',
			required: true,
		})
	},
	async run(context) {
        
        context.store.put('whippyName', context.propsValue['get_whippy_name'] , StoreScope.PROJECT);

		return context.propsValue['get_whippy_name'];
	},
});
