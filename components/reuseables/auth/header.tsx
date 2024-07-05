import { ReactElement, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib";

export default function Header({
  title,
  elseGoTo,
  extra,
  center,
}: {
  title: string;
  extra?: ReactElement | ReactNode | undefined | string;
  elseGoTo?: { link?: string; text?: string; info: string };
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "header flex flex-col gap-2",
        center && "justify-center text-center items-center"
      )}
    >
      {extra && extra}
      <h1 className="font-semibold text-[36px]">{title}</h1>
      {elseGoTo && (
        <div className={cn("don flex gap-2", center && "text-center")}>
          <span>{elseGoTo?.info}</span>
          {elseGoTo.link && elseGoTo.text && (
            <Link
              className="text-primary underline hover:bg-transparent font-semibold hover:text-primary-800"
              href={elseGoTo?.link}
            >
              {elseGoTo?.text}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
