"use client";

import { LayoutDashboard, LogOut, SidebarClose } from "lucide-react";
import { ScrollShadow } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";

import sidebarLinks from "./links";

import { UserType } from "@/types";
import { Logo } from "@/components/reuseables";
import { LinkType, routeeType } from "@/types/dashboard";
import { cn } from "@/lib";

const SideBar = ({
  user,
  setMenuIsOpen,
}: {
  user: UserType | undefined;
  setMenuIsOpen: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "side-bar bg-secondary",
        "w-full h-full",
        "relative flex-flex-col border-r-1"
      )}
      style={{
        display: "grid",
        gridTemplateRows: "80px 1fr",
      }}
    >
      <div className="flex justify-between items-center p-4">
        <div className="logo sm:px-2">
          <Link href={"/"}>
            <Logo color="default" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xl md:hidden"
            onClick={() => setMenuIsOpen(false)}
          >
            <SidebarClose />
          </button>
        </div>
      </div>
      <ScrollShadow
        className="overflow-scroll custom-scroll-bar h-full min-h-full flex flex-col gap-5 md:gap-6 p-4 md:p-5 max-h-full"
        size={10}
      >
        <div className="deep flex flex-col gap-3">
          <Rt
            route={{
              to: "/dashboard",
              icon: <LayoutDashboard />,
              name: "Dashboard",
            }}
            setMenuIsOpen={setMenuIsOpen}
          />

          {sidebarLinks.map((s) => {
            return (
              <div
                key={s.title.split(" ").join("_")}
                className="book-coner flex flex-col"
              >
                <div className="links--box flex flex-col gap-3">
                  {s.links.map((l: LinkType) => {
                    return (
                      l.accessRoles.includes(user?.role || "student") && (
                        <Rt
                          key={l.to}
                          btnFunc={l.func}
                          isBtn={l.isButton}
                          route={l}
                          setMenuIsOpen={setMenuIsOpen}
                        />
                      )
                    );
                  })}
                </div>
              </div>
            );
          })}

          <Rt
            btnFunc={async () => await signOut()}
            isBtn={true}
            route={{
              to: "/logout",
              icon: <LogOut />,
              name: "Log out",
            }}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>
      </ScrollShadow>
    </div>
  );
};

export default SideBar;

const Rt = ({
  route,
  setMenuIsOpen,
  isBtn = false,
  btnFunc,
}: {
  route: routeeType;
  setMenuIsOpen: (value: boolean) => void;
  isBtn?: boolean;
  btnFunc?: Function;
}) => {
  const path = usePathname();

  return isBtn ? (
    <Button
      className={cn(
        "flex p-0 m-0 w-full justify-start min-w-full text-start bg-transparent",
        "c flex gap-3 p-4 py-5 rounded-sm text-sm items-center hover:opacity-80 h-[44px]",
        path === route.to && "bg-primary text-primary-foreground"
      )}
      radius="sm"
      variant="flat"
      onPress={async () => {
        setMenuIsOpen(false);
        btnFunc && (await btnFunc());
      }}
    >
      <span>{route.icon}</span>
      <span className="w-full">{route.name}</span>
    </Button>
  ) : (
    <Button
      as={Link}
      className={cn(
        "flex p-0 m-0 w-full justify-start min-w-full text-start bg-transparent",
        "c flex gap-3 p-4 py-5 rounded-sm text-sm items-center hover:opacity-80 h-[44px]",
        path === route.to && "bg-primary text-primary-foreground"
      )}
      href={route.to}
      radius="sm"
      target={route.outLink ? "_blank" : ""}
      variant="flat"
    >
      <span>{route.icon}</span>
      <span className="w-full">{route.name}</span>
    </Button>
  );
};
