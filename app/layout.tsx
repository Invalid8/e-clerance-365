import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";

import { ThemeProviders, AuthProvider } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { authOptions } from "@/lib";
import { ToastContainer } from "@/lib/showNotification";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background max-w-full m-auto min-w-[280px] font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProviders
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <AuthProvider session={session}>
            <NextTopLoader color="#373535" />
            {children}
            <ToastContainer />
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
