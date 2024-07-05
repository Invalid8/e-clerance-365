import NextAuth from "next-auth/next";
import { UserType } from "./User";

declare module "next-auth" {
  interface Session {
    user: UserType;
  }
}
