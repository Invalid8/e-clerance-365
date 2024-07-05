"use client";

import { signOut } from "next-auth/react";
import { ReactElement, useEffect } from "react";
import useLocalStorage from "use-local-storage";

import { getProfile } from "@/app/actions/endpoints";
import { useRouter } from "next/navigation";

export default function Template({ children }: { children: ReactElement }) {
  const [, setRole] = useLocalStorage<string>("role", "");
  const router = useRouter();

  useEffect(() => {
    /** Check if user is authenticated  */
    async function checkIfAuth() {
      const { success, data: user } = await getProfile();

      if (!success) {
        setRole("");
        await signOut({ redirect: false, callbackUrl: "/dashboard" });
        router.push("/auth/login");
        return;
      }

      setRole(user?.role);
    }
    checkIfAuth();
  }, [setRole, router]);

  return <>{children}</>;
}
