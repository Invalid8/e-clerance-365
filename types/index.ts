import { SVGProps } from "react";

import {
  UserType,
  RoleType,
  StudentType,
  NYSCType,
  InstitutionType,
} from "./User";

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type {
  UserType,
  IconSvgProps,
  RoleType,
  StudentType,
  NYSCType,
  InstitutionType,
};
