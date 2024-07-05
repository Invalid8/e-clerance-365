"use client";

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-content-center w-full h-svh">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2>Something went wrong!</h2>
        <p>If problem presist contact developer</p>
        <Button
          className="dark:bg-white dark:text-black"
          color="primary"
          radius="sm"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
