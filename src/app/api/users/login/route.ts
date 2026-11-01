import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connectDB();

export async function POST(request:NextRequest) {
    
    try {
        
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not exist' }, { status: 400 });
        }

        const comparePassword = await bcryptjs.compare(password, user.password)
        if (!comparePassword) {
            return NextResponse.json({message:'Invalid password'}, {status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
            
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
        const response = NextResponse.json({
            message: 'Login successful',
            success:true,
        }, { status: 200 });


        response.cookies.set('token', token,{
            httpOnly:true
        })

        return response;

        
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}