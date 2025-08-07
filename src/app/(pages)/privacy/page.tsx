import Link from "next/link";

export default function Privacy() {
  return (
    <main className="prose dark:prose-invert container">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> May 26, 2025
      </p>

      <p>
        We care about your privacy. Here&apos;s what data we collect and how we
        use it.
      </p>

      <h2>1. What We Collect</h2>
      <ul>
        <li>Your name and email</li>
        <li>IP address and browser info (user agent)</li>
        <li>OAuth-related data if you sign in with Google or GitHub</li>
      </ul>
      <p>We also use cookies for authentication and CSRF protection.</p>

      <h2>2. How We Use Your Data</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Let you sign in and manage your profile</li>
        <li>Display your contributions</li>
        <li>Keep the site secure and functional</li>
      </ul>
      <p>
        We don&apos;t sell or share your personal information with third
        parties.
      </p>

      <h2>3. Your Control</h2>
      <p>You can:</p>
      <ul>
        <li>View and edit your data from your profile</li>
        <li>Delete your account and all associated data</li>
        <li>
          Contact us anytime at{" "}
          <Link href="mailto:support@techquestions.works">
            support@techquestions.works
          </Link>
        </li>
      </ul>

      <h2>4. Security</h2>
      <p>
        We take reasonable steps to protect your data. But like any online
        service, we can&apos;t guarantee perfect security.
      </p>

      <h2>5. Cookies</h2>
      <p>
        We only use cookies necessary for sign-in and site security. No tracking
        or third-party marketing cookies.
      </p>

      <h2>6. Changes</h2>
      <p>
        If we change how we handle your data, we&apos;ll let you know.
        We&apos;ll post updates here and, for major changes, notify you by email
        if possible.
      </p>
    </main>
  );
}
