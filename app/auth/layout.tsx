import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}

export default Layout;
