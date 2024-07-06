"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HomeAuth, HomeNoAuth } from "@/views";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-background px-4 lg:px-6 h-16 flex items-center justify-between bg-white text-black">
        <Link href="/" className="flex items-center">
          <span className="ml-2 text-lg font-bold">E-Clearance</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {session && (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:underline underline-offset-4 text-primary"
              >
                Dashboard
              </Link>
              <Button
                color="primary"
                radius="sm"
                className="w-fit"
                onChange={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </>
          )}
          {!session && (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:underline underline-offset-4 text-primary"
              >
                Login
              </Link>
              <Button
                as={Link}
                color="primary"
                radius="sm"
                href="/auth/signup"
                className="w-fit"
              >
                Register
              </Button>
            </>
          )}
        </nav>
      </header>
      {session && <HomeAuth />}
      {!session && <HomeNoAuth />}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 E-Clearance. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/policy"
            className="text-xs hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="/services"
            className="text-xs hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-xs hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
