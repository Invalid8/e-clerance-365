"use client";

import { ReactElement, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import SideBar from "./sidebar";
import NavBar from "./navbar";

import { cn } from "@/lib";
import { MainWrapper } from "@/components/layout";

function Layout({ children }: { children: ReactElement }) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  if (!session) redirect("/auth/login");

  const user = session?.user;

  return (
    <div className="dashboard flex h-screen w-full md:items-center overflow-hidden">
      <div
        className={cn(
          "bar fixed md:relative left-0 w-full bottom-0 top-0",
          "md:left-auto md:top-auto md:bottom-auto md:translate-x-0 md:z-auto",
          "md:min-w-[285px] max-w-[285px] h-full",
          menuIsOpen && "z-[10000] translate-x-0 animate-fade-right",
          !menuIsOpen && "-z-[10000] -translate-x-full animate-fade-left"
        )}
      >
        <SideBar setMenuIsOpen={setMenuIsOpen} user={user} />
      </div>
      <div className="main flex flex-col gap-1 w-full md:h-screen h-full max-w-full max-h-full relative overflow-hidden">
        <NavBar
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          user={user}
        />
        <MainWrapper>{children}</MainWrapper>
        {menuIsOpen && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="veil fixed left-0 right-0 top-0 bottom-0 bg-[#0000009f] z-[9000] sm:hidden flex"
            onClick={() => setMenuIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Layout;
