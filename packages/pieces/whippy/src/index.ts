
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

export const whippy = createPiece({
  displayName: "Whippy",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://www.whippy.ai/logo.svg",
  authors: [],
  actions: [sendMessage,createContact,createNote,updateContact,listContacts,listMessage,listConversations,listUserChannels,listChannels,showChannels,createSequenceContacts,getSequences,listSequenceContact,listSequenceRun,showSequences,showSequenceRun,listAutomation,showOrganization,createTag,updateTag,listTags,deleteTag,listCampaignContacts,listCampaigns,sendCampaign,showCampaign,createCustomObjects,createCustomProperty,createCustomRecord,listCustomObjectRecords,listCustomObjects,listCustomPropertyValues,updateCustomObject,updateCustomProperty],
  triggers: [],
});
