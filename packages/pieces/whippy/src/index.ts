
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { getWhippyName } from "./lib/actions/whippy";
import { sendMessage } from "./lib/actions/messages/send-message";
import { createContact } from "./lib/actions/contact/create-contact";
import { createNote } from "./lib/actions/messages/create-note";
import { updateContact } from "./lib/actions/contact/update-contact";
import { listContacts } from "./lib/actions/contact/list-contact";
import { listMessage } from "./lib/actions/conversation/list-message";
import { listConversations } from "./lib/actions/conversation/list-converations";

export const whippy = createPiece({
  displayName: "Whippy",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://www.whippy.ai/logo.svg",
  authors: [],
  actions: [sendMessage,createContact,createNote,updateContact,listContacts,listMessage,listConversations],
  triggers: [],
});
