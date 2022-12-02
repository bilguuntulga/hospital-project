import React, { Suspense } from "react";
import PageLoading from "../PageLoading";

export default function LazyPageWrapper({ lazy_path }) {
  const LazyComponent = React.lazy(() => import(`../${lazy_path}`));

  return (
    <Suspense
      fallback={
        <PageLoading />
      }
    >
      <LazyComponent />
    </Suspense>
  );
}
