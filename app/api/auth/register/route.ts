import prisma from "@/lib/prisma";
import { registerValidation } from "@/lib/validations";
import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({
      message: "Methode not allowed",
    });
  }

  const body = await req.json();
  const data = registerValidation.parse(body)

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "user already exist",
      });
    }

    const hashPass = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: { email: data.email, username: data.username, name: data.name, password: hashPass },
    });

    return NextResponse.json({
      success: true,
      message: "user created successfully",
    }, { status: 200 });
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
      }, { status: 500 });
    }
  }
}
