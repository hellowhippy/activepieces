import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

export const sendMessage = createAction({
	name: 'send_message', 
  auth: PieceAuth.None(),
  displayName:'Send Text Message',
  description: 'Send Text Message',
	props: {
        // Properties to ask from the user, in this ask we will take number of
		getAPIKey: Property.ShortText({
			displayName: 'API Key',
			required: true,
		}),
        getMessage: Property.ShortText({
			displayName: 'Text Message',
			required: true,
		}),
        getToNumber: Property.ShortText({
			displayName: 'Destination Number',
			required: true,
		}),
        
	},
	async run(context) {
        
        //context.store.get('message', StoreScope.FLOW).then((data:any)=>{
            //let phoneNumber = data.phoneNumber;
            //let message = data.message;

            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  'X-WHIPPY-KEY': context.propsValue['getAPIKey']
                },
                body: JSON.stringify({from: '+12133381105', to: context.propsValue['getToNumber'], body: context.propsValue['getMessage']})
              };
              
              fetch('https://api.whippy.co/v1/messaging/sms', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));


        //});

		return true;
	},
});
