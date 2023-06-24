import connect from "@/utils/db";
import Group from "@/models/group";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req,{param}) => {
    await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const groups = await Group.findbyId(param.id)
    .populate("members", { name: 1, surname: 1, avatar: 1 })
    .populate("latestMessage");
  return new NextResponse(JSON.stringify(groups), { status: 200 });
};
