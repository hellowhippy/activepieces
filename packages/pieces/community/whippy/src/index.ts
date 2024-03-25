import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { sendMessage } from "./lib/actions/messages/send-message";
import { createContact } from "./lib/actions/contact/create-contact";
import { createNote } from "./lib/actions/messages/create-note";
import { updateContact } from "./lib/actions/contact/update-contact";
import { listContacts } from "./lib/actions/contact/list-contact";
import { listMessage } from "./lib/actions/conversation/list-message";
import { listConversations } from "./lib/actions/conversation/list-conversations";
import { listAutomation } from "./lib/actions/automation/list-automation-templates";
import { showOrganization } from "./lib/actions/organization/show-organization";
import { createTag } from "./lib/actions/tag/create-tag";
import { updateTag } from "./lib/actions/tag/update-tag";
import { listTags } from "./lib/actions/tag/list-tags";
import { deleteTag } from "./lib/actions/tag/delete-tag";
import { listCampaignContacts } from "./lib/actions/campaign/list-campaign-contacts";
import { listCampaigns } from "./lib/actions/campaign/list-campaigns";
import { showCampaign } from "./lib/actions/campaign/show-campaign";
import { sendCampaign } from "./lib/actions/campaign/send-campaign";
import { createSequenceContacts } from "./lib/actions/sequence/create-sequence-contacts";
import { createCustomObjects } from "./lib/actions/custom-object/create-custom-object";
import { createCustomProperty } from "./lib/actions/custom-object/create-custom-property";
import { createCustomRecord } from "./lib/actions/custom-object/create-custom-record";
import { updateCustomObject } from "./lib/actions/custom-object/update-custom-object";
import { updateCustomProperty } from "./lib/actions/custom-object/update-custom-property";
import { listCustomObjectRecords } from "./lib/actions/custom-object/list-custom-records";
import { listCustomObjects } from "./lib/actions/custom-object/list-custom-objects";
import { listCustomPropertyValues } from "./lib/actions/custom-object/list-custom-property";
import { getSequences } from "./lib/actions/sequence/get-sequences";
import { listSequenceContact } from "./lib/actions/sequence/list-sequence-contact";
import { listUserChannels } from "./lib/actions/channels/list-user-channels";
import { listChannels } from "./lib/actions/channels/list-channels";
import { showChannels } from "./lib/actions/channels/show-channel";
import { listSequenceRun } from "./lib/actions/sequence/list-sequence-run";
import { showSequences } from "./lib/actions/sequence/show-sequence";
import { showSequenceRun } from "./lib/actions/sequence/show-sequence-run";
import { messageCreated } from "./lib/triggers/message-created";
import { conversationCreated } from "./lib/triggers/conversation-created";
import { conversationUpdated } from "./lib/triggers/conversation-updated";
import { messageUpdated } from "./lib/triggers/message-updated";
import { campaignCreated } from "./lib/triggers/campaign-created";
import { campaignUpdated } from "./lib/triggers/campaign-updated";
import { contactCreated } from "./lib/triggers/contact-created";
import { contactUpdated } from "./lib/triggers/contact-updated";
import { leadNew } from "./lib/triggers/lead-new";
import { templateCreated } from "./lib/triggers/message-template-created";
import { templateDeleted } from "./lib/triggers/message-template-deleted";
import { templateUpdated } from "./lib/triggers/message-template-updated";
import { sequenceCreated } from "./lib/triggers/sequence-created";
import { sequenceUpdated } from "./lib/triggers/sequence-updated";
import { sequenceRunCreated } from "./lib/triggers/sequence-run-created";
import { sequenceRunUpdated } from "./lib/triggers/sequence-run-updated";
import { stepContactCreated } from "./lib/triggers/step-contact-created";
import { stepContactUpdated } from "./lib/triggers/step-contact-updated";
import { stepCreated } from "./lib/triggers/step-created";
import { updateConversation } from "./lib/actions/conversation/update-conversation";
import { stepUpdated } from "./lib/triggers/step-updated";

export const appAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  description: 'Enter your API key',
  required: true,
});

export const whippy = createPiece({
  displayName: "Whippy",
  auth: appAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://www.whippy.ai/logo.svg",
  authors: [],
  actions: [
    sendMessage,
    createContact,
    createNote,
    updateContact,
    listContacts,
    listMessage,
    listConversations,
    listUserChannels,
    listChannels,
    showChannels,
    createSequenceContacts,
    getSequences,
    listSequenceContact,
    listSequenceRun,
    showSequences,
    showSequenceRun,
    listAutomation,
    showOrganization,
    createTag,
    updateTag,
    listTags,
    deleteTag,
    listCampaignContacts,
    listCampaigns,
    sendCampaign,
    showCampaign,
    createCustomObjects,
    createCustomProperty,
    createCustomRecord,
    listCustomObjectRecords,
    listCustomObjects,
    listCustomPropertyValues,
    updateCustomObject,
    updateCustomProperty,
    updateConversation
  ],
  triggers: [
    messageCreated,
    messageUpdated,
    campaignCreated,
    campaignUpdated,
    contactCreated,
    contactUpdated,
    conversationCreated,
    conversationUpdated,
    leadNew,
    templateCreated,
    templateDeleted,
    templateUpdated,
    sequenceCreated,
    sequenceUpdated,
    sequenceRunCreated,
    sequenceRunUpdated,
    stepContactCreated,
    stepContactUpdated,
    stepCreated,
    stepUpdated],
});
