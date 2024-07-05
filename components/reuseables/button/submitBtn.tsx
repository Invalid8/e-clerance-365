"use client";

import { Button } from "@nextui-org/react";

import { cn } from "@/lib";

const SubmitBtn = ({
  children,
  className,
  isLoading = false,
  isDisabled,
}: {
  children: React.ReactElement | string;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <Button
      className={cn("w-full p-4 py-6 font-medium text-lg", className)}
      color="primary"
      disabled={isDisabled}
      isLoading={isLoading}
      type="submit"
      radius="none"
    >
      {children}
    </Button>
  );
};

export default SubmitBtn;
