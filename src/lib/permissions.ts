import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  userAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  questions: ["list", "create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  questions: ["list", "create", "update", "delete"],
  ...adminAc.statements,
});

export const user = ac.newRole({
  ...userAc.statements,
});
