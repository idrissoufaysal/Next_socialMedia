import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// eslint-disable-next-line @typescript-eslint/ban-types
export function authenticateToken(req: NextRequest, res: NextResponse, next:Function) {
    const authHeader = headers().get('authorization')
    const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({message:"no token provided"},{status:404})
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return NextResponse.json({
       message:"Invalid token"
      });
    }

    req.user = user;
    next();
  });
}
