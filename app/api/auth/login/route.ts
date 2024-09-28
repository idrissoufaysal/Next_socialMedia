import type { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export default async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const { email, password } = await req.json();


    res.status(200).json({ success: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
