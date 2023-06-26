import connect from "@/utils/db";
import Group from "@/models/group";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { pusherServer } from "@/libs/pusher";

export const POST = async (req, { params }) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const group = await Group.findById(params.id)
    .populate("members", { name: 1, surname: 1, avatar: 1 })
    .populate("latestMessage");
  if (group.latestMessage.seenBy.includes(session.sub)) {
    return new NextResponse(JSON.stringify("Already seen"), { status: 200 });
  }
  const updatedMessage = await Message.findByIdAndUpdate(
    group.latestMessage._id,
    {
      $push: { seenBy: session.sub },
    },
    { new: true }
  )
    .populate("sender", { name: 1, surname: 1, avatar: 1 })
    .lean();

  // Update group
  group.latestMessage = updatedMessage;
  console.log("group", group);
  await pusherServer.trigger(session.sub, "group:update", group);

  // Update last message seen
  await pusherServer.trigger(params.id, "messages:update", updatedMessage);
  return new NextResponse(JSON.stringify(updatedMessage), { status: 200 });
};
