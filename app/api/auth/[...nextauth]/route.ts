// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import nextAuth from "next-auth";
import { apiUrl } from "@/app/constants";

export const authConfig = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await fetch(`${apiUrl}/login`, {
          method: "POST",
          body: JSON.stringify(
            {
              email: credentials?.email,
              password: credentials?.password
            }),
          headers: { "Content-Type": "application/json" },

        })
        const user = await res.json()
        //  Retourner l'utilisateur si les identifiants sont corrects
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }
    ),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.email = token.email;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default nextAuth(authConfig);