
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { getWhippyName } from "./lib/actions/whippy";
import { sendMessage } from "./lib/actions/send-message";
import { createContact } from "./lib/actions/create-contact";

export const whippy = createPiece({
  displayName: "Whippy",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://www.whippy.ai/logo.svg",
  authors: [],
  actions: [sendMessage,createContact],
  triggers: [],
});
