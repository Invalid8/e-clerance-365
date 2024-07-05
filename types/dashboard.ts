import React, { ReactElement, ReactNode } from "react";

import { RoleType } from "./User";

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

export type routeeType = {
  to: string;
  icon: ReactElement;
  name: string | ReactElement | ReactNode;
  outLink?: boolean;
};

export type chartType = {
  title: string;
  count: number | string | ReactNode;
  to: string;
  img: imgType;
  class: string;
  roleTypes: string[];
};

export type SideBarLink = {
  title: string;
  links: LinkType[];
};

export type LinkType = {
  to: string;
  icon: React.JSX.Element;
  accessRoles: RoleType[];
  name: React.JSX.Element | string;
  outLink?: boolean;
  isButton?: true;
  func?: Function;
};

export type EmailType = {
  id: string;
  name: string;
  email: string;
  status?: "active" | "disabled";
};

export type NewsletterType = {
  id: string;
  title: string;
  subject: string;
  sent: string;
};

export type TagType = {
  id: string;
  name: string;
  color: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
};
