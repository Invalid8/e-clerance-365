import {
  Cog,
  List,
  Mailbox,
  NotebookPen,
  TagsIcon,
  User,
  User2,
  UserPlus,
} from "lucide-react";

import { SideBarLink } from "@/types/dashboard";

const sidebarLinks: SideBarLink[] = [
  {
    title: "",
    links: [
      {
        to: "/dashboard/students",
        icon: <User2 />,
        accessRoles: ["institution", "nysc"],
        name: "Students",
      },
    ],
  },
  {
    title: "User Profiles",
    links: [],
  },
];

export default sidebarLinks;
