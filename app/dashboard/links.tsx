import { Cog, List, Mailbox, NotebookPen, TagsIcon, User } from "lucide-react";

import { SideBarLink } from "@/types/dashboard";

const sidebarLinks: SideBarLink[] = [
  {
    title: "",
    links: [
      {
        to: "/dashboard/tags",
        icon: <TagsIcon />,
        accessRoles: ["student", "institution", "nysc"],
        name: "Email Tags",
      },
      {
        to: "/dashboard/email",
        icon: <Mailbox />,
        accessRoles: ["student", "institution", "nysc"],
        name: "All Emails",
      },
      {
        to: "/dashboard/newsletter",
        icon: <List />,
        accessRoles: ["student", "institution", "nysc"],
        name: "All Newsletters",
      },
      {
        to: "/dashboard/newsletter/create",
        icon: <NotebookPen />,
        accessRoles: ["student", "institution", "nysc"],
        name: "Create Newsletter",
      },
    ],
  },
  {
    title: "User Profiles",
    links: [
      {
        to: "/dashboard/settings",
        icon: <Cog />,
        accessRoles: ["student", "institution", "nysc"],
        name: "Settings",
      },
      {
        to: "/dashboard/profile",
        icon: <User />,
        accessRoles: ["student", "institution", "nysc"],
        name: "Profile",
      },
    ],
  },
];

export default sidebarLinks;
