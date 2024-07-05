import { ReactElement } from "react";

export type ivType = {
  searchElement:
    | string
    | number
    | "md"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | undefined;
  fromIndex?: number | undefined;
};

export type repeatType = "repeat" | "no-repeat" | "repeat-x" | "repeat-y";

export type positionType =
  | "botttom"
  | "top"
  | "left"
  | "right"
  | "right-bottom"
  | "left-bottom"
  | "left-top"
  | "right-top";

export type sizeType = "auto" | "cover" | "contain" | "full";

export type imgType =
  | "tag"
  | "books"
  | "default"
  | "gradient0"
  | "gradient1"
  | "logo-small"
  | "logo-big"
  | "gradient-0-logo"
  | "gradient-1-logo"
  | "scratch"
  | "gradient-0-scratch"
  | "gradient-1-scratch"
  | "wallet"
  | "coin-bag"
  | null
  | undefined;

export type GradientImgType = {
  children: ReactElement;
  className?: string;
  size?: sizeType;
  position?: positionType;

  attachmentIsFixed?: boolean;
  img?: string;
  imgOpacity?: string;
  repeat?: repeatType;
  blend?: string;
  width?: number;
  height?: number;
  radius?: number;
};
