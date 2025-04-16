import { Suspense } from "react";

import { Profile, ProfileLoader } from "@/features/users";

export default function User({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="container max-w-screen-sm py-16">
      <Suspense fallback={<ProfileLoader />}>
        <Profile
          params={params}
          searchParams={searchParams}
          className="motion-preset-focus"
        />
      </Suspense>
    </main>
  );
}
