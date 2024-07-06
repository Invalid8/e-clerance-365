"use client";

import { User } from "@nextui-org/react";
import { SidebarOpen } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { cn } from "@/lib";
import { UserType } from "@/types";
import { SearchInput } from "@/components/reuseables";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NavBar = ({
  menuIsOpen,
  setMenuIsOpen,
  user,
}: {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: boolean) => void;
  user: UserType | undefined;
}) => {
  return (
    <div className="nav flex justify-between items-center w-full p-2 px-4 h-full max-h-[80px] border-b-1 bg-secondary">
      <button className="text-xl md:hidden" onClick={() => setMenuIsOpen(true)}>
        <SidebarOpen />
      </button>

      <div
        className={cn(
          "flex md:justify-between gap-4 items-center w-fit md:w-full"
        )}
      >
        <SearchInput />
        <Avatar>
          <AvatarFallback>ED</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavBar;
