"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { navlinks } from "./data";
import Menu from "./menu";

import { cn } from "@/lib";
import { Logo, ThemeToggle } from "@/components/reuseables";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Navbar
      shouldHideOnScroll
      className="px-[24px] sm:h-[88px] h-[68px] sm:py-[2px] items-center z-[100]"
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="items-center" justify="start">
        <div className="flex items-center gap-10">
          <NavbarBrand as={Link} className="brand" href={"/"}>
            <Logo color="white" />
          </NavbarBrand>
        </div>
      </NavbarContent>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="xl:hidden flex text-white"
      />

      <NavbarContent
        as="div"
        className="items-center gap-6 xl:flex hidden"
        justify="end"
      >
        {navlinks.map((link) => {
          return (
            <NavbarItem key={link.name.split("_").join("_")}>
              {link.to ? (
                <Link
                  className={cn(
                    "text-[#000]e",
                    pathname == link.to && "text-[#001]e"
                  )}
                  color="foreground"
                  href={link.to}
                >
                  {link.name}
                </Link>
              ) : (
                <Button
                  className={cn(
                    "font-semibold text-[14px] tracking-wide flex items-center",
                    link.className
                  )}
                >
                  {link.name}
                </Button>
              )}
            </NavbarItem>
          );
        })}
        {!session ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                className="py-[9px] px-[17px] text-center h-11 text-[16px]"
                color="primary"
                href="/auth/login"
                type="button"
                variant="flat"
              >
                Get Started
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              className="py-[9px] px-[17px] text-center h-11 text-[16px]"
              color="primary"
              type="button"
              variant="flat"
              onClick={async () => await signOut()}
            >
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <div className="xl:flex hidden">
        <ThemeToggle className="z-[1000]" />
      </div>

      <Menu setIsMenuOpen={setIsMenuOpen} />
    </Navbar>
  );
}
