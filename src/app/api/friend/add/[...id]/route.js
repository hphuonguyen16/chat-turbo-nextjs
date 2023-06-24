import connect from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const POST = async (req) => {
  const session = await getToken({ req, secret: process.env.SECRET });
  try {
      await connect();
    const myID = session.sub;
    const requestID = req.params.id;
      const users = await User.find({_id: requestID});
      const myUser = await User.find({_id: myID});
      if (!users) {
        return new NextResponse("User not found", { status: 404 });
      }
      if (users.friends.includes(myID)) {
        return new NextResponse("Already friends", { status: 400 });
        }
        users.waitingAcceptFriends.push(myID);
        myUser.waitingRequestFriends.push(requestID);
        await users.save();
        await myUser.save();
    return new NextResponse( "Request Successfully" ,{ status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
