import * as React from "react";
import { ExplorerHubClient } from "@/components/explorer/explorer-hub-client";
import { Skeleton } from "@/components/ui/skeleton";

function ExplorerFallback() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-12 flex flex-col gap-8">
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-14 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-80 w-full rounded-xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <React.Suspense fallback={<ExplorerFallback />}>
      <ExplorerHubClient />
    </React.Suspense>
  );
}
