import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import Axios from "axios";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect();
        try {
          const response = await Axios.post(
            "https://chat-web-vz9a.onrender.com/api/auth/login",
            credentials
          );
          const user = response.data;
          return user;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
			session.user = token;
			return session;
		},
  },
  pages: {
    error: "/login",
  },

});

export { handler as GET, handler as POST };