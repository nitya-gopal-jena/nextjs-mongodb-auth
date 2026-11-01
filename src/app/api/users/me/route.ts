import connectDB from '@/config/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required',
        },
        { status: 401 },
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
      
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid or expired token',
      },
      { status: 401 },
    );
  }
}
