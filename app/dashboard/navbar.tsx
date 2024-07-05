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

const NavBar = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 w-fit md:py-6 gap-2 flex items-center font-semibold h-fit hover:bg-transparent hover:opacity-80 outline-none">
              <span className="flex flex-col items-end">
                <span className="capitalize font-medium text-[16px]">
                  Hi, {user?.username}
                </span>
                <span className="text-primary0 text-xs font-normal">
                  {user?.email_address}
                </span>
              </span>
              <User
                avatarProps={{
                  src: user?.image,
                  size: "md",
                }}
                name={""}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/profile" prefetch={false}>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/settings" prefetch={false}>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
