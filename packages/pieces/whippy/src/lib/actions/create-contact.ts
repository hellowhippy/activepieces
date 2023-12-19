import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";

export const createContact = createAction({
	name: 'create_contact', 
  auth: PieceAuth.None(),
  displayName:'Create Contact',
  description: 'Create Contact',
	props: {
        // Properties to ask from the user, in this ask we will take number of
		getAPIKey: Property.ShortText({
			displayName: 'API Key',
			required: true,
		}),
        getEmail: Property.ShortText({
			displayName: 'Contact Email Address',
			required: false,
		}),
        getName: Property.ShortText({
			displayName: 'Contact Name',
			required: false,
		}), 
        getPhone: Property.Number({
			displayName: 'Contact Phone Number',
			required: true,
		}),
	},
	async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const email = context.propsValue['getEmail'];
        const name = context.propsValue['getName'];
        const phoneNumber = context.propsValue['getPhone'];
    
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-WHIPPY-KEY': apiKey
            },
            body: JSON.stringify({
                phone: phoneNumber,
                email: email,
                name: name,
                opt_in_to_all_channels: true
            })
        };
    
        try {
            const response = await fetch('https://api.whippy.co/v1/contacts', options);
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    
        return true;
    }
});
