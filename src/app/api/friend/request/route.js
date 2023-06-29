import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse(JSON.stringify({}), { status: 401 });
    }
    const myUser = await User.findById(session.sub).populate('waitingAcceptedFriends');
    return new NextResponse(JSON.stringify(myUser.waitingAcceptedFriends), { status: 200 });
};
