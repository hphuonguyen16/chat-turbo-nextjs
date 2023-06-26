import connect from '@/utils/db';
import Group from '@/models/group';
import Message from '@/models/message';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { pusherServer } from '@/libs/pusher';

export const POST = async (req, { params }) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }
    const group = await Group.findById(params.id);
    const updatedMessage = await Message.findByIdAndUpdate(
        group.latestMessage,
        {
            $push: { seenBy: session.sub },
        }
    );
    await pusherServer.trigger(session.sub, 'group:update', group);

    // Update last message seen
    await pusherServer.trigger(params.id, 'message:update', updatedMessage);
    return new NextResponse('Seen', { status: 200 });
};
