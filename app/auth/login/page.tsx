import { Suspense } from "react";
import { Metadata } from "next";

import { Login } from "@/views";

export const metadata: Metadata = {
  title: "Login",
};

export default async function page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
