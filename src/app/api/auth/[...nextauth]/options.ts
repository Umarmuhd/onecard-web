import client from "@/data/client/index";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const safeAwait = require("safe-await");

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        const [error, data] = await safeAwait(
          client.auth.login({
            email: credentials?.email!,
            password: credentials?.password!,
          })
        );
        if (error) {
          console.log(error);

          return null;
        } else {
          return data;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token.user as Session["user"];
      session.token = token.jwt as Session["token"];
      return session;
    },
  },
};
