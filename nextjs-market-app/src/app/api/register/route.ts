
// POST 파라미터 받고 패스워드 해싱, db에 user 넣기(prisma client객체 만들어서)
import bcrypt from "bcryptjs";
import prisma from '@/helpers/prismadb'
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const body = await request.json();

    const {
        email,
        name,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12); // 12: salt

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user);
}