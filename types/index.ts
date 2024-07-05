import { SVGProps } from "react";

import { UserType, RoleType, StudentType } from "./User";

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type { UserType, IconSvgProps, RoleType, StudentType };
