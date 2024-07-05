import { usePathname } from "next/navigation";
import { NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { navlinks } from "./data";

import { ThemeToggle } from "@/components/reuseables";
import { cn } from "@/lib";

export default function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session }: any = useSession();

  return (
    <NavbarMenu className="pt-12 gap-6 custom-scroll-bar">
      {navlinks.map((item, index) => (
        <NavbarMenuItem key={`${item.name}-${index}`}>
          <Link
            className={cn(
              "text-blacke dark:text-[#B0E6FA]e",
              pathname == item.to && "text-primarye dark:text-whitee"
            )}
            color="foreground"
            href={item.to}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        </NavbarMenuItem>
      ))}
      {!session ? (
        <>
          <NavbarMenuItem>
            <Button
              as={Link}
              className="py-[9px] px-[17px] text-center h-11 text-black text-[16px]"
              color="primary"
              href="/auth/login"
              type="button"
              variant="flat"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </NavbarMenuItem>
        </>
      ) : (
        <NavbarMenuItem>
          <Button
            className="py-[9px] px-[17px] text-center h-11 text-black text-[16px]"
            color="primary"
            type="button"
            variant="flat"
            onClick={async () => {
              setIsMenuOpen(false);
              await signOut();
            }}
          >
            Logout
          </Button>
        </NavbarMenuItem>
      )}
      <NavbarMenuItem>
        <ThemeToggle />
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
