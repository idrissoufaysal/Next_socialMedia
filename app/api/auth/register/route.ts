import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({
      message: "Methode not allowed",
    });
  }

  const { email, password, username, name } = await req.json();
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({
        message: "user already exist",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, username, name, password: hashPass },
    });

  return  NextResponse.json({
      success:true ,
      message: "user created successfully",
    },{status:200});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);

    if (error.type === "CredentialsSignin") {
      return NextResponse.json({
        error: "erreur ..",
      });
    } else {
      return NextResponse.json({
        error: error.message,
      },{status:500});
    }
  }
}
