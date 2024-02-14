
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { getWhippyName } from "./lib/actions/whippy";
import { sendMessage } from "./lib/actions/messages/send-message";
import { createContact } from "./lib/actions/contact/create-contact";
import { createNote } from "./lib/actions/messages/create-note";
import { updateContact } from "./lib/actions/contact/update-contact";
import { listContacts } from "./lib/actions/contact/list-contact";
import { listMessage } from "./lib/actions/conversation/list-message";
import { listConversations } from "./lib/actions/conversation/list-converations";
import { listUserChannels } from "./lib/actions/channels/list-user-channels";
import { listChannels } from "./lib/actions/channels/list-channels";
import { showChannels } from "./lib/actions/channels/show-channel";
import { getSequences } from "./lib/actions/sequence/get-sequences";
import { listSequenceContact } from "./lib/actions/sequence/list-sequence-contact";
import { listSequenceRun } from "./lib/actions/sequence/list-sequence-run";
import { showSequences } from "./lib/actions/sequence/show-sequence";
import { showSequenceRun } from "./lib/actions/sequence/show-sequence-run";
import { listAutomation } from "./lib/actions/automation/list-automation-templates";
import { showOrganization } from "./lib/actions/organization/show-organization";
import { createTag } from "./lib/actions/tag/create-tag";
import { updateTag } from "./lib/actions/tag/update-tag";
import { deleteTag } from "./lib/actions/tag/delete-tag";
import { listTags } from "./lib/actions/tag/list-tags";
import { listCampaigns } from "./lib/actions/campaign/list-campaigns";
import { sendCampaign } from "./lib/actions/campaign/send-campaign";
import { showCampaign } from "./lib/actions/campaign/show-campaign";
import { listCampaignContacts } from "./lib/actions/campaign/list-campaign-contacts";
import { createSequenceContacts } from "./lib/actions/sequence/create-sequence-conatcts";
import { createCustomObjects } from "./lib/actions/custom-object/create-custom-object";
import { createCustomRecord } from "./lib/actions/custom-object/create-custom-record";
import { listCustomObjectRecords } from "./lib/actions/custom-object/list-custom-records";
import { listCustomObjects } from "./lib/actions/custom-object/list-custom-objects";
import { listCustomPropertyValues } from "./lib/actions/custom-object/list-custom-property";
import { createCustomProperty } from "./lib/actions/custom-object/create-custom-property";
import { updateCustomObject } from "./lib/actions/custom-object/update-custom-object";
import { updateCustomProperty } from "./lib/actions/custom-object/update-custom-property";
import { listApplications } from "./lib/triggers/developer-applications/list-applications";
import { createApplication } from "./lib/triggers/developer-applications/create-developer-application";
import { showApplication } from "./lib/triggers/developer-applications/show-developer-application";
import { updateApplication } from "./lib/triggers/developer-applications/update-developer-application";
import { callwhippyapi } from "./lib/common";
import { HttpMethod } from "@activepieces/pieces-common";
import { showDeveloperEndpoint } from "./lib/triggers/developer-endpoints/show-developer-endpoint";
import { updateDeveloperEndpoint } from "./lib/triggers/developer-endpoints/update-developer-endpoint";
import { createDeveloperEndpoint } from "./lib/triggers/developer-endpoints/create-developer-endpoint";
import { listDeveloperEndpoints } from "./lib/triggers/developer-endpoints/list-endpoints";

export const appAuth = PieceAuth.SecretText({
	displayName: "API Key",
	description: 'Enter your API key',
	required: true
  })

export const whippy = createPiece({
  displayName: "Whippy",
  auth: appAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://www.whippy.ai/logo.svg",
  authors: [],
  actions: [sendMessage,createContact,createNote,updateContact,listContacts,listMessage,listConversations,listUserChannels,listChannels,showChannels,createSequenceContacts,getSequences,listSequenceContact,listSequenceRun,showSequences,showSequenceRun,listAutomation,showOrganization,createTag,updateTag,listTags,deleteTag,listCampaignContacts,listCampaigns,sendCampaign,showCampaign,createCustomObjects,createCustomProperty,createCustomRecord,listCustomObjectRecords,listCustomObjects,listCustomPropertyValues,updateCustomObject,updateCustomProperty],
  triggers: [listApplications, createApplication, showApplication, updateApplication, showDeveloperEndpoint,
	updateDeveloperEndpoint, createDeveloperEndpoint, listDeveloperEndpoints],
});
  
export const whippyAuth = PieceAuth.SecretText({
	  displayName: 'API Key',
	  description: "Enter API KEY",
	  required: true,
	  validate: async ({auth}) => {
		  try{
			  await callwhippyapi( HttpMethod.GET , "endpoints" , auth , undefined);
			  return{
				  valid: true,
			  };
		  }catch(e){
			  return{
				  valid: false,
				  error: 'Invalid API Key',
			  };
		  }
	  }
});