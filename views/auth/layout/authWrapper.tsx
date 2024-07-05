"use client";

import { ReactElement } from "react";
import { ScrollShadow } from "@nextui-org/react";

import { Logo } from "@/components/reuseables";
import { GradientImg } from "@/components/layout";

const AuthWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-full w-full min-w-full flex max-w-full justify-center items-center">
      <div className="w-full min-h-svh sm:max-h-screen md:basis-[45%] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-between sm:justify-evenly gap-4 m-0 mx-0">
        <div className="w-full flex sm:hidden">
          <Logo />
        </div>

        <div className="md:max-w-[540px] w-full flex flex-col gap-[32px] justify-center mx-auto">
          {children}
        </div>

        <div className="sm:hidden flex" />
      </div>
    </div>
  );
};

export default AuthWrapper;
