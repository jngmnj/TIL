import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/helpers/prismadb'

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions);

        if(!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma?.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if(!currentUser) {
            return null;
        }
    } catch(error) {
        return null;
    }
}