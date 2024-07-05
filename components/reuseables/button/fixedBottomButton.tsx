import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { cn } from "@/lib";

interface VerifyButtonProps {
  buttonTxt: string;
  btnsubtxt?: string;
  btnsubtxtlnk?: { pathname: string; function?: (e?: any) => void }; // Use a more flexible type
  isDisabled: boolean;
  isLoad: boolean;
  onClick?: () => void;
  className?: string;
  unFix?: boolean;
  isSubmitBtn?: boolean;
}

const FixedBottomButton: React.FC<VerifyButtonProps> = ({
  isDisabled,
  isLoad,
  buttonTxt,
  btnsubtxt,
  btnsubtxtlnk,
  onClick,
  className,
  unFix,
  isSubmitBtn,
}) => {
  return (
    <div
      className={cn(
        "m-auto w-full items-center justify-center text-center",
        unFix && "relative",
        !unFix && "absolute bottom-8 "
      )}
    >
      <Button
        className={cn("text-base font-medium", className)}
        color="primary"
        isDisabled={isDisabled}
        isLoading={isLoad}
        radius="md"
        size="lg"
        type={isSubmitBtn ? "submit" : "button"}
        onClick={onClick && onClick}
      >
        {buttonTxt}
      </Button>

      {btnsubtxtlnk && (
        <Link href={btnsubtxtlnk.pathname} onClick={btnsubtxtlnk.function}>
          <p className={cn("mt-4")}>{btnsubtxt}</p>
        </Link>
      )}
    </div>
  );
};

export default FixedBottomButton;
