import { Suspense } from "react";
import { AppPageClient } from "./AppPageClient";

export default function AppPage() {
  return (
    <Suspense fallback={<div className="mx-auto w-full max-w-[1450px] px-4 py-8 lg:px-8" />}>
      <AppPageClient />
    </Suspense>
  );
}
