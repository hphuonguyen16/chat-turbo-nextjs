import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		id: string;
		user: JWT;
	}

	interface User {
		access_token: string;
		userInfo: {
			id: string;
			userName: string;
			email: string;
			name: string;
			surname: string;
			role: string[];
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		access_token: string;
		userInfo: {
			id: string;
			userName: string;
			email: string;
			name: string;
			surname: string;
			role: string[];
		};
	}
}
