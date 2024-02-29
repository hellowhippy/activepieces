/**
Create Sequence Contacts Action

This action creates a sequence contacts in Whippy. Sequence ID, From, and To are required.

API Documentation: https://docs.whippy.ai/reference/createsequencecontacts
*/

import { createAction, Property } from "@activepieces/pieces-framework";
import { appAuth } from "../../..";
import { Sequence } from "../../api/api";

interface ToNumber {
    custom_a: string;
    custom_b: string;
    custom_c: string;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
    phone: string;
}

export const createSequenceContacts = createAction({
    name: 'create_sequence_contacts',
    auth: appAuth,
    displayName: 'Create Sequence Contacts',
    description: 'Create Sequence Contacts',
    props: {
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
                    displayName: 'Resource',
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
        getToNumber:  Property.Array({
            displayName: 'Destination Number',
            required: true,
            description: 'List of contacts that would receive the campaign.',
            defaultValue: [{
                custom_a: "",
                custom_b: "",
                custom_c: "",
                email: "",
                first_name: "",
                last_name: "",
                name: "",
                phone: "",
            }] as ToNumber[],
        }),
    },
    async run(context) {
        const apiKey = context.auth;
        const seqID = context.propsValue['getSequenceID'];
        const fromNumber = context.propsValue['getFromNumber'];
        const toNumber = context.propsValue['getToNumber'];
        const stepID = context.propsValue['getStepId'];
        const scheduleAt = context.propsValue['getSchedule'];
        const customData = context.propsValue['getCustomData'];

      try {
          const response = await Sequence.createSequenceContacts(apiKey, seqID, `+${fromNumber.toString()}`,
          toNumber, stepID, scheduleAt, customData);
          if (response.success) {
            return response.data; 
          } else {
            console.error(response.message);
            return false;
          }
        } catch (error) {
            throw new Error(`Failed to create sequence contacts: ${error}`);
        }
    },
});
