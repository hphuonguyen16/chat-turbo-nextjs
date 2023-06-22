import connect from "@/utils/db";
import UserGroup from "@/models/user_group";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import authOptions  from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

export const GET = async (req: NextApiRequest,
  res: NextApiResponse) => {
    // const session = await getServerSession(req, res, authOptions)
    // console.log(session)
    
  try {
      await connect();
      const users = await User.find();
    return new NextResponse(users, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
