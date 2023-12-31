import connect from '@/utils/db';
import Group from '@/models/group';
import Message from '@/models/message';
import User from '@/models/user';
import LastSeen from '@/models/lastSeen';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }
    const myId = session.sub;
    const groups = await Group.find({ members: myId })
        .populate('members', { name: 1, surname: 1, avatar: 1 })
        .populate('latestMessage')
        .sort({ updatedAt: -1 });
    return new NextResponse(JSON.stringify(groups), { status: 200 });
};

export const POST = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }
    const body = await req.json();
    const myID = session.sub;
    const { name, members } = body;
    members.push(myID);
    const group = await Group.create({
        name,
        members,
    });
    const newMessage = await Message.create({
        sender: myID,
        recipient: members[0],
        recipientGroup: group._id,
        content: 'Now you can chat with your friends!',
    });
    const lastSeenPromises = members.map((member) => {
        return LastSeen.create({
          user: member,
          message: newMessage._id,
        });
      });
    
      const lastSeen = await Promise.all(lastSeenPromises);
    
      await Group.findByIdAndUpdate(group._id, {
        latestMessage: newMessage._id,
        lastSeen: lastSeen.map((seen) => seen._id),
      });

    return new NextResponse(JSON.stringify(group), { status: 200 });
};
