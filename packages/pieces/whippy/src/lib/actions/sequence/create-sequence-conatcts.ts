/**
Create Sequence Contacts Action

This action creates a sequence contacts in Whippy. Sequence ID, From, and To are required.

API Documentation: https://docs.whippy.ai/reference/createsequencecontacts
*/

import { createAction, Property, PieceAuth, StoreScope } from "@activepieces/pieces-framework";
import { Sequence } from "../../api/api";

export const createSequenceContacts = createAction({
    name: 'create_sequence_contacts',
    auth: PieceAuth.None(),
    displayName: 'Create Sequence Contacts',
    description: 'Create Sequence Contacts',
    props: {
        getAPIKey: Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
        getSequenceID: Property.ShortText({
            displayName: 'Sequence ID',
            required: true,
        }),
        getFromNumber: Property.ShortText({
            displayName: 'Sending Number',
            required: true,
        }),
        getCustomData: Property.Object({
            displayName: 'Custom Data',
            required: false,
            description: 'List of contacts that would receive the campaign.',
            defaultValue: {
                custom_object_id: "",
                resource: Property.StaticDropdown({
                    displayName: '',
                    required: false,
                    options: { options: [{ label: 'contact', value: 'contact' }, { label: 'step_contact', value: 'step_contact' }] }
                }),
            },
        }),
        getStepId: Property.ShortText({
            displayName: 'Step ID',
            required: false,
        }),
        getSchedule: Property.DateTime({
            displayName: 'Scheduling Time',
            required: false,
        }),
        getToNumber: Property.Object({
            displayName: 'Destination Number',
            required: true,
            description: 'List of contacts that would receive the campaign.',
            defaultValue: {
                custom_a: "",
                custom_b: "",
                custom_c: "",
                email: "",
                first_name: "",
                last_name: "",
                name: "",
                phone: "",
            },
        }),
    },
    async run(context) {
        const apiKey = context.propsValue['getAPIKey'];
        const seqID = context.propsValue['getSequenceID'];
        const fromNumber = context.propsValue['getFromNumber'];
        const toNumber = context.propsValue['getToNumber'];
        const stepID = context.propsValue['getStepId'];
        const scheduleAt = context.propsValue['getSchedule'];
        const customData = context.propsValue['getCustomData'];

      try {
          const response = await Sequence.createSequenceContacts(apiKey, seqID, fromNumber, toNumber, stepID, scheduleAt,
            customData);
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
