import connect from "@/utils/db";
import Group from "@/models/group";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req, { params }) => {
//   await connect();
//   const session = await getToken({ req, secret: process.env.SECRET });
//   if (!session) {
//     return new NextResponse("Unauthenticated", { status: 401 });
//   }
//     const lates = await Group.findById(params.id).la;
//     groups.latestMessage.seen
//   return new NextResponse(JSON.stringify(groups), { status: 200 });
};
