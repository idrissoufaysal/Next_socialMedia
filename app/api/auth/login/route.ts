import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({
      error: "Method not allowed",
    });
  }

  const { email, password } = await req.json();
  try {

    const user = await prisma.user.findUnique({ where: {email} });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials !!!");
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      {
        message: "user connected successfully",
        token
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
