"use client";

import { Button } from "@nextui-org/react";
import { Newspaper, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NotNewsletter = () => {
  const router = useRouter();

  return (
    <div
      className="div sm:p-8 p-4 w-full min-h-[150px] grid place-content-center"
      style={{ height: "calc(100svh - 150px)" }}
    >
      <div className="none w-full flex flex-col gap-2 justify-center items-center">
        <div className="text-primary">
          <Newspaper size={80} />
        </div>
        <h3>Newsletter does not exist</h3>
        <Button
          as={Link}
          className="w-fit"
          color="primary"
          href="/dashboard/newsletter/create"
          radius="sm"
        >
          Add Newsletter
        </Button>
        <button className="underline" onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
};

export const NotEmail = () => {
  const router = useRouter();

  return (
    <div
      className="div sm:p-8 p-4 w-full min-h-[150px] grid place-content-center"
      style={{ height: "calc(100svh - 150px)" }}
    >
      <div className="none w-full flex flex-col gap-2 justify-center items-center">
        <div className="text-primary">
          <User size={80} />
        </div>
        <h3>This email does not exist</h3>
        <Button
          as={Link}
          className="w-fit"
          color="primary"
          href="/dashboard/email#add"
          radius="sm"
        >
          Add Email
        </Button>
        <button className="underline" onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
};
