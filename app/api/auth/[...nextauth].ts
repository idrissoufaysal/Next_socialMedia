// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import nextAuth from "next-auth";

export const authConfig = {
  providers: [],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default nextAuth(authConfig);
