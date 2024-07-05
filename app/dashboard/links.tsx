import { Cog, List, Mailbox, NotebookPen, TagsIcon, User } from "lucide-react";

import { SideBarLink } from "@/types/dashboard";

const sidebarLinks: SideBarLink[] = [
  {
    title: "",
    links: [
      {
        to: "/dashboard/tags",
        icon: <TagsIcon />,
        accessRoles: ["MODERATOR", "USER", "ADMIN"],
        name: "Email Tags",
      },
      {
        to: "/dashboard/email",
        icon: <Mailbox />,
        accessRoles: ["MODERATOR", "USER", "ADMIN"],
        name: "All Emails",
      },
      {
        to: "/dashboard/newsletter",
        icon: <List />,
        accessRoles: ["MODERATOR", "ADMIN", "USER"],
        name: "All Newsletters",
      },
      {
        to: "/dashboard/newsletter/create",
        icon: <NotebookPen />,
        accessRoles: ["MODERATOR", "USER", "ADMIN"],
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
        accessRoles: ["MODERATOR", "USER", "ADMIN"],
        name: "Settings",
      },
      {
        to: "/dashboard/profile",
        icon: <User />,
        accessRoles: ["MODERATOR", "USER", "ADMIN"],
        name: "Profile",
      },
    ],
  },
];

export default sidebarLinks;
