import { betterAuth, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, magicLink, multiSession, username } from "better-auth/plugins";
import { ilike } from "drizzle-orm";

import { database, schema } from "@/database";
import { reactMagicLinkEmail } from "@/lib/emails/magic-link-email";
import { reactResetPasswordEmail } from "@/lib/emails/reset-password-email";
import { reactVerificationEmail } from "@/lib/emails/verification-email";
import { sendEmail } from "@/lib/resend";

const from =
  process.env.FROM_EMAIL || "TechQuestions <noreply@techquestions.works>";

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
  advanced: { database: { generateId: false } },
  databaseHooks: { user: { create: { before } } },
  plugins: [username(), admin(), magicLink({ sendMagicLink }), multiSession()],
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
        input: true,
      },
      role: {
        type: "string",
        required: true,
        input: false,
      },
    },
  },
});

async function before(user: User) {
  const usernameBase = user.email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9_.]/g, "")
    .slice(0, 30)
    .toLowerCase();

  const usersWithSameBase = await database
    .select({ username: schema.users.username })
    .from(schema.users)
    .where(ilike(schema.users.username, `${usernameBase}%`));

  const existingUsernames = new Set(usersWithSameBase.map((u) => u.username));

  let displayUsername = usernameBase;
  let counter = 1;

  while (existingUsernames.has(displayUsername)) {
    const suffix = String(counter);
    const baseLength = 30 - suffix.length;
    displayUsername = usernameBase.slice(0, baseLength) + suffix;
    counter++;
  }

  return {
    data: {
      ...user,
      displayUsername,
      username: displayUsername.toLowerCase(),
    },
  };
}

async function sendMagicLink({ email, url }: { email: string; url: string }) {
  await sendEmail({
    from,
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
    from,
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
    from,
    to: user.email,
    subject: "Reset your password",
    react: reactResetPasswordEmail({
      username: user.name,
      resetLink: url,
    }),
  });
}
