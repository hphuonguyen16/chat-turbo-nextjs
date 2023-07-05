import connect from '@/utils/db';
import Group from "@/models/group";
import Message from "@/models/message";
import LastSeen from '@/models/lastSeen';
import User from "@/models/user";
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    await connect();
    const groups = await Group.findById(params.id).populate('members', {
        name: 1,
        surname: 1,
        avatar: 1,
        quote: 1,
    });
    return new NextResponse(JSON.stringify(groups), { status: 200 });
};
