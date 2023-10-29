import { AuthResponse } from "@/types/auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends AuthResponse {}
}
