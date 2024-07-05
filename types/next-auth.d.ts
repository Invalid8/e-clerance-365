import NextAuth from "next-auth/next";
import { StudentType, UserType, InstitutionType } from "@/types";

declare module "next-auth" {
  interface Session {
    user: StudentType | InstitutionType | NYSCType;
  }
}
