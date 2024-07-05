import { clsx } from "clsx";
import { ReactElement, ReactNode } from "react";

export const Info = ({
  children,
  className,
}: {
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}) => {
  return (
    <div className={clsx("info flex flex-col gap-3", className)}>
      {children}
    </div>
  );
};

export const InfoHeader = ({
  children,
  className,
}: {
  children: ReactElement | string | ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("text-[40px] leading-[48px] font-[600]", className)}>
      {children}
    </div>
  );
};

export const InfoText = ({
  children,
  className,
}: {
  children: ReactElement | string | ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "font-normal text-base pr-6 tracking-wide leading-[23.3px]",
        className
      )}
    >
      {children}
    </div>
  );
};
