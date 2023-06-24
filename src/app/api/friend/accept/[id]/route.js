import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import Message from '@/models/message';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const POST = async (req, {params}) => {
    const session = await getToken({ req, secret: process.env.SECRET });
        await connect();
        const myID = session.sub;
        const requestID = params.id;
        const users = await User.findById(requestID);
        const myUser = await User.findById(myID);
        if (!users) {
            return new NextResponse('User not found', { status: 404 });
        }
        User.findByIdAndUpdate(requestID, {
            $push: { friends: myID },
        });
        User.findByIdAndUpdate(myID, {
            $push: { friends: requestID },
        });
        User.findByIdAndUpdate(requestID, {
            $pull: { waitingAcceptedFriends: myID },
        });
        User.findByIdAndUpdate(myID, {
            $pull: { waitingRequestFriends: requestID },
        });
        // Add group
        const group = await Group.create({
            name: 'Group chat',
            members: [myID, requestID],
        });
        const newMessage = await Message.create({
            sender: myID,
            recipient: requestID,
            recipientGroup: group._id,
            content: 'Now you can chat with your friend!',
        });
        Group.findByIdAndUpdate( group._id, {
            $push: { latestMessage: newMessage._id },
        })
        return new NextResponse('Accept Successfully', { status: 200 });
};
