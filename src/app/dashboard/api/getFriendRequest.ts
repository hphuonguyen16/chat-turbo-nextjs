import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function getFriendRequest() {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `http://localhost:3000/api/friend/request/${session.user._doc._id}`,
    {
      method: "GET",
    }
  );
  return res.json();
}
