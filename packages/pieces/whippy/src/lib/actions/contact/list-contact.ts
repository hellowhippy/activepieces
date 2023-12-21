import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";

export const listContacts = createAction({
    name: 'list_contacts',
    auth: PieceAuth.None(),
    displayName: 'List Contacts',
    description: 'Fetch a list of contacts',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getName: Property.ShortText({
            displayName: 'Contact Name',
            required: false,
        }),
        getEmail: Property.ShortText({
            displayName: 'Contact Email Address',
            required: false,
        }),
        getPhone: Property.Number({
            displayName: 'Contact Phone Number',
            required: false,
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const name = context.propsValue['getName'];
        const email = context.propsValue['getEmail'];
        const phone = context.propsValue['getPhone'];

        // Build the URL with static parameters
        let url = `https://api.whippy.co/v1/contacts?limit=50&offset=0`;

        // Create a new URLSearchParams object
        const queryParams = new URLSearchParams();

        // Add dynamic parameters if provided
        if (name !== undefined) {
            queryParams.set('name', name);
        }

        if (email !== undefined) {
            queryParams.set('email', email);
        }

        if (phone !== undefined) {
            queryParams.set('phone', phone.toString());
        }

        // Append the query parameters to the URL
        url += `&${queryParams.toString()}`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-WHIPPY-KEY': apiKey,
            },
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
            console.log(responseData);

            // Return the API response
            return responseData;
        } catch (error) {
            console.error(error);
            // You might want to handle errors differently and return a relevant value
            return false;
        }
    },
});
