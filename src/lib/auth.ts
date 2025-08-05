import { betterAuth, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";

import { reactMagicLinkEmail } from "@/components/emails/magic-link-email";
import { reactResetPasswordEmail } from "@/components/emails/reset-password-email";
import { reactVerificationEmail } from "@/components/emails/verification-email";
import { database, schema } from "@/database";
import { sendEmail } from "@/lib/send-email";

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
  plugins: [magicLink({ sendMagicLink })],
  advanced: { database: { generateId: false } },
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
