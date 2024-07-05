"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="veil w-full h-full min-h-[150px] overflow-hidden flex flex-col items center justify-center"
      style={{ height: "calc(100svh)" }}
    >
      <div className="inner flex flex-col gap-2 p-4 justify-center items-center text-xl">
        <div className="f flex flex-col gap-1 text-center">
          <div className="text-[40px] mb-4">(〜￣▽￣)〜</div>
          <h3 className="text-3xl">Seems you are lost!</h3>
          <p className="text-medium">
            Don{"'"}t worry you can get your way back and if it get too <br />
            overwhelming just go home.
          </p>
        </div>
        <div className="btn-container flex justify-center items-center gap-2 pt-2">
          <Button
            className="shadow-sm px-7 py-5 rounded-sm tracking-wider text-lg flex items-center"
            radius="sm"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            as={Link}
            className="shadow-sm px-7 py-5 rounded-sm tracking-wider text-lg flex items-center"
            color="primary"
            href="/"
            radius="sm"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
