import { betterAuth, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, multiSession, username } from "better-auth/plugins";

import { reactMagicLinkEmail } from "@/components/emails/magic-link-email";
import { reactResetPasswordEmail } from "@/components/emails/reset-password-email";
import { reactVerificationEmail } from "@/components/emails/verification-email";
import { database, schema } from "@/database";
import { sendEmail } from "@/lib/send-email";

import { createBaseFromEmail, getUsernamesStartingWith } from "./utils";

const google = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};

const github = {
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
};

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword,
  },
  socialProviders: { google, github },
  plugins: [magicLink({ sendMagicLink }), username(), multiSession()],
  advanced: { database: { generateId: false } },
  databaseHooks: { user: { create: { before } } },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        sortable: true,
        unique: true,
        returned: true,
      },
      displayUsername: {
        type: "string",
        required: true,
        sortable: true,
        unique: false,
        returned: true,
      },
    },
  },
});

async function sendMagicLink({ email, url }: { email: string; url: string }) {
  await sendEmail({
    from: process.env.FROM_EMAIL!,
    to: email,
    subject: "Sign in to your account",
    react: reactMagicLinkEmail({
      magicLink: url,
    }),
  });
}

async function sendVerificationEmail({
  user,
  url,
}: {
  user: User;
  url: string;
}) {
  await sendEmail({
    from: process.env.FROM_EMAIL!,
    to: user.email,
    subject: "Verify your email address",
    react: reactVerificationEmail({
      username: user.name,
      verifyLink: url,
    }),
  });
}

async function sendResetPassword({ user, url }: { user: User; url: string }) {
  await sendEmail({
    from: process.env.FROM_EMAIL!,
    to: user.email,
    subject: "Reset your password",
    react: reactResetPasswordEmail({
      username: user.name,
      resetLink: url,
    }),
  });
}

async function before(user: {
  email: string;
  username?: string;
  displayUsername?: string;
}) {
  if (user.username) return { data: user };

  const base = createBaseFromEmail(user.email);
  let username = base.toLowerCase();
  let displayUsername = base;

  const existingUsernames = await getUsernamesStartingWith(base.toLowerCase());

  for (let i = 0; existingUsernames.has(username); i++) {
    const suffix = String(i);
    displayUsername = base.slice(0, 30 - suffix.length) + suffix;
    username = displayUsername.toLowerCase();
  }

  return {
    data: {
      ...user,
      username,
      displayUsername,
    },
  };
}
