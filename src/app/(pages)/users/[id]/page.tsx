import { Suspense } from "react";

import { Profile } from "./profile";
import { ProfileSkeleton } from "./profile-skeleton";

export default function User({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="container max-w-xl">
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile
          params={params}
          searchParams={searchParams}
          className="motion-preset-focus"
        />
      </Suspense>
    </main>
  );
}
