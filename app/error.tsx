"use client";

import { ErrorView } from "@/views";

export default function ErrorPage({
  reset,
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorView error={error} reset={reset} />;
}
