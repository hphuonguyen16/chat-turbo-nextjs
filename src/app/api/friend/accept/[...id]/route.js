import connect from '@/utils/db';
import User from '@/models/user';
import Chat from '@/models/chat';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const POST = async (req) => {
    const session = await getToken({ req, secret: process.env.SECRET });
    try {
        await connect();
        const myID = session.sub;
        const requestID = req.params.id;
        const users = await User.find({ _id: requestID });
        const myUser = await User.find({ _id: myID });
        if (!users) {
            return new NextResponse('User not found', { status: 404 });
        }
        myUser.friends.push(requestID);
        users.friends.push(myID);
        users.waitingAcceptFriends.remove(myID);
        myUser.waitingRequestFriends.remove(requestID);
        
        await users.save();
        await myUser.save();
        return new NextResponse('Accept Successfully', { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
