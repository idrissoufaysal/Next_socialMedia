// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import nextAuth from "next-auth";

export const authConfig = {
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
      async authorize(credentials, req) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email, password } = credentials;

        // const existingUser = prisma.user.findUnique({ where: { email:email } });
        // if (!existingUser) {
        //   throw new Error("user does not exist");
        
        // Implémente ta logique d'authentification ici
        const res = await fetch("https://localhost:3000/api/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });

        const user = await res.json();

      //  Retourner l'utilisateur si les identifiants sont corrects
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default nextAuth(authConfig);
