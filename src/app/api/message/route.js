import connect from "@/utils/db";
import Group from "@/models/group";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export const POST = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const myId = session.sub;
  const body = await req.json();
    console.log(body);
    const { recipient, recipientGroup, content, parentMessage, hearts } = body;
    const message = await Message.create({
      sender: myId,
      recipient,
      recipientGroup,
      content,
      parentMessage,
      hearts,
    });
    await Group.findByIdAndUpdate(recipientGroup, {
      latestMessage: message._id,
    });
    // await pusherServer.trigger(recipientGroup, "newMessage", message);
    return new NextResponse("Message sent", { status: 200 });
};
