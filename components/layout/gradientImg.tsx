import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib";

const gradientImgVariant = cva(
  "bg-gradient0 relative overflow-hidden flex flex-col z-10 p-4 after:w-full after:h-full after:-z-10 after:absolute after:top-0 after:left-0 min-w-[100px] min-h-[100px]",
  {
    variants: {
      position: {
        default: "after:bg-right-bottom",
        top: "after:bg-top",
        bottom: "after:bg-bottom",
        "right-top": "after:bg-right-top",
        "right-bottom": "after:bg-right-bottom",
        "left-top": "after:bg-left-top",
        "left-bottom": "after:bg-left-bottom",
        center: "after:bg-center",
      },
      attachmentIsFixed: {
        default: "",
        fixed: "after:bg-fixed",
      },
      size: {
        default: "after:bg-auto",
        auto: "after:bg-auto",
        cover: "after:bg-cover",
        contain: "after:bg-contain",
        fill: "after:bg-fill",
      },
      img: {
        default: "after:bg-gradient-0-logo",
        gradient0: "after:bg-gradient0",
        gradient1: "after:bg-gradient1",
        "logo-small": "after:bg-logo-small",
        "logo-big": "after:bg-logo-big",
        "gradient-0-logo": "after:bg-gradient-0-logo",
        "gradient-1-logo": "after:bg-gradient-1-logo",
        scratch: "after:bg-scratch",
        "gradient-0-scratch": "after:bg-gradient-0-scratch",
        "gradient-1-scratch": "after:bg-gradient-1-scratch",
      },
      imgOpacity: {
        default: "after:opacity-10",
        5: "after:opacity-5",
        10: "after:opacity-10",
        20: "after:opacity-20",
        30: "after:opacity-30",
        40: "after:opacity-40",
        50: "after:opacity-50",
        60: "after:opacity-60",
        70: "after:opacity-70",
        80: "after:opacity-80",
        90: "after:opacity-90",
        100: "after:opacity-100",
      },
      repeat: {
        default: "after:bg-no-repeat",
        repeat: "after:bg-repeat",
        "repeat-x": "after:bg-repeat-x",
        "repeat-y": "after:bg-repeat-y",
        "no-repeat-x": "after:bg-no-repeat-x",
        "no-repeat-y": "after:bg-repno-eat-y",
        "no-repeat": "after:bg-no-repeat",
      },
      blend: {
        default: "after:bg-blend-color",
        color: "after:bg-blend-color",
        hue: "after:bg-blend-hue",
        overlay: "after:bg-blend-overlay",
        multiply: "after:bg-blend-multiply",
        saturation: "after:bg-blend-saturation",
      },
      width: { default: "w-full" },
      height: { default: "h-full" },
    },
    defaultVariants: {
      position: "default",
      attachmentIsFixed: "default",
      size: "default",
      img: "default",
      imgOpacity: "default",
      repeat: "default",
      blend: "default",
      width: "default",
      height: "default",
    },
  }
);

export interface GradientImgProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientImgVariant> {
  asChild?: boolean;
}

const GradientImg = React.forwardRef<HTMLDivElement, GradientImgProps>(
  (
    {
      className,
      position,
      size,
      attachmentIsFixed,
      img,
      imgOpacity,
      repeat,
      blend,
      width,
      height,
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
          gradientImgVariant({
            position,
            size,
            attachmentIsFixed,
            img,
            imgOpacity,
            repeat,
            blend,
            width,
            height,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

GradientImg.displayName = "Button";

export default GradientImg;
