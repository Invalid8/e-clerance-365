import { Metadata } from "next";

import { Register } from "@/views";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function page() {
  return <Register />;
}
