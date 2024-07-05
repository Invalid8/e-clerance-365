"use client";

import Link from "next/link";
import { ChevronsRight, MoveDownLeft } from "lucide-react";

import { GradientImg, Info, InfoHeader, InfoText } from "@/components/layout";
import { Logo } from "@/components/reuseables";

const Cardy = () => {
  return (
    <GradientImg
      blend={"overlay"}
      className="text-black w-full min-w-[280px] max-w-[500px] h-full max-h-full sm:flex hidden bg-red-200 md:basis-[60%]"
      img="gradient-0-scratch"
      imgOpacity={40}
      position="top"
      size="cover"
    >
      <div className="card h-full flex flex-col justify-between gap-8 md:gap-10 px-4 sm:px-6 md:px-10 py-6 sm:py-10 md:py-12">
        <div className="logo order-first md:min-w-[120px] flex">
          <Link href="/">
            <Logo color="black" />
          </Link>
        </div>
        <Info className="gap-[32px]">
          <InfoHeader>
            <h2 className="gap-x-4 gap-y-3 flex flex-wrap">
              <span className="flex gap-2 items-center">
                Send,
                {/* <MoveRight /> */}
              </span>
              <span className="flex gap-2 items-center">
                Receive <MoveDownLeft />
              </span>
              <span className="flex gap-2 items-center">
                <span>& Pay</span>
                {/* <Banknote /> */}
              </span>
              <span className="flex gap-2 items-center">
                <span>with Swift</span>
                <span>
                  <ChevronsRight />
                </span>
              </span>
              <span> </span>
            </h2>
          </InfoHeader>
          <InfoText>
            <p className="text-gray-900 text-medium md:pr-8 pr-4 text-justify">
              Take control of your finances with our all-in-one financial
              dashboard. Easily handle payments, track transactions, and monitor
              your finances in one place. Sign in now to get started!
            </p>
          </InfoText>
        </Info>
      </div>
    </GradientImg>
  );
};

export default Cardy;
