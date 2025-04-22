import {
  adminClient,
  magicLinkClient,
  multiSessionClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    adminClient({ ac }),
    magicLinkClient(),
    multiSessionClient(),
  ],
});
