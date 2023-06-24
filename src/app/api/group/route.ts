import connect from "@/utils/db";
import UserGroup from "@/models/user_group";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt"

export const GET = async (req: NextApiRequest,
  res: NextApiResponse) => {
 
  try {
    await connect();
     const session = await getToken({ req, secret: process.env.SECRET });
    console.log(session);
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const id = session.sub;
    const groups = await UserGroup.find({ userId: id })
    return new NextResponse(JSON.stringify(groups), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
