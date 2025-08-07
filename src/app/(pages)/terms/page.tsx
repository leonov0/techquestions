import Link from "next/link";

export default function Terms() {
  return (
    <main className="prose dark:prose-invert container">
      <h1>Terms of Service</h1>
      <p>
        <strong>Effective Date:</strong> May 26, 2025
      </p>

      <p>
        Welcome to <strong>TechQuestions</strong> — a community-driven platform
        for real tech interview questions. By using this site, you agree to
        follow these terms.
      </p>

      <h2>1. Using TechQuestions</h2>
      <p>
        You can browse content without creating an account. But to post or
        contribute, you&apos;ll need to sign in using Google, GitHub, or email.
        You are responsible for keeping your account secure and for anything
        done using your account.
      </p>

      <h2>2. Your Contributions</h2>
      <p>
        By posting content (like questions, answers, or comments), you give us
        the right to display it publicly on the site. You still own your
        content, but you allow others to view and learn from it.
      </p>
      <p>Please don&apos;t:</p>
      <ul>
        <li>Post harmful, misleading, or illegal content.</li>
        <li>Copy or steal content you don&apos;t have rights to.</li>
        <li>Spam or harass others.</li>
      </ul>
      <p>
        We may remove content or restrict access if someone breaks these rules.
      </p>

      <h2>3. Account Deletion</h2>
      <p>
        You can delete your account and data at any time. Just head to your
        profile settings or contact us at{" "}
        <Link href="mailto:support@techquestions.works">
          support@techquestions.works
        </Link>
        .
      </p>

      <h2>4. No Guarantees</h2>
      <p>
        This is a free, community-run site. We do our best to keep things
        running smoothly, but we can&apos;t guarantee that everything will
        always work perfectly. The site is provided “as is.”
      </p>

      <h2>5. Changes to These Terms</h2>
      <p>
        We might update these terms from time to time. If we make significant
        changes, we&apos;ll let you know. By continuing to use the site, you
        accept the updated terms.
      </p>
    </main>
  );
}
