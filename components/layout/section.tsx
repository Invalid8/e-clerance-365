import { VariantProps } from "@nextui-org/react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ReactElement, ReactNode, forwardRef } from "react";

import { cn } from "@/lib";

const SectionWrapVariant = cva("w-full flex flex-col gap-4", {
  variants: {},
  defaultVariants: {},
});

export interface SectionWrapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof SectionWrapVariant> {
  asChild?: boolean;
}

const SectionWrap = forwardRef<HTMLDivElement, SectionWrapProps>(
  (
    {
      className,

      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          SectionWrapVariant({
            className,
          })
        )}
        {...props}
      />
    );
  }
);

SectionWrap.displayName = "SectonWrap";
export default SectionWrap;

export function SectionMain({
  children,
  className,
}: {
  children?: string | ReactElement | ReactNode | ReactElement[] | ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full max-w-full max-h-full p-4 md:min-h-[250px] min-h-[250px] bg-[#FBFBFB] dark:bg-dark-0 shadow-md rounded-md custom-scroll-bar overflow-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children?: string | ReactElement | ReactNode | ReactElement[] | ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      <h4 className="he text-[28px] font-semibold">{children}</h4>
    </div>
  );
}
export function SectionSubTitle({
  children,
  className,
}: {
  children?: string | ReactElement | ReactNode | ReactElement[] | ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      <h5 className="he text-[22px] font-semibold">{children}</h5>
    </div>
  );
}
