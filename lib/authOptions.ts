import { Session, TokenSet, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { destroyToken } from "@/lib";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        id: {},
        password: {},
        userTokenIn: {},
        loginAs: {},
      },
      async authorize(credentials) {
        const payload = {
          id: credentials?.id,
          password: credentials?.password,
          loginAs: credentials?.loginAs,
        };

        const userTokenIn = credentials?.userTokenIn;

        if (!userTokenIn) {
          try {
            const userRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );

            const resData = await userRes.json();

            if (![200, 204, 201].includes(resData?.statusCode)) {
              const { message } = resData;

              throw new Error(message || `Error fetching user data`);
            }

            const { user, token } = resData.data;

            return { ...user, accessToken: token };
          } catch (error: any) {
            throw new Error(error.toString());
          }
        }

        if (userTokenIn) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userTokenIn}`,
                },
              }
            );

            const resData = await res.json();

            if (![200, 204, 201].includes(resData?.statusCode)) {
              const { message } = resData;

              throw new Error(message || `Error fetching user data`);
            }

            const { data: user } = resData;

            return { ...user, accessToken: userTokenIn };
          } catch (error: any) {
            throw new Error(error?.toString());
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: TokenSet; user: User }) {
      return { ...token, ...user };
    },

    async session({
      session,
      token,
      trigger,
    }: {
      session: Session;
      token: TokenSet;
      user: User;
      trigger: string;
    }) {
      if (trigger === "update" && session?.user) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token = session.user;
      }

      if (!session.user) return session;
      else {
        session.user = token as any;

        return session;
      }
    },

    async signOut() {
      await destroyToken();
    },
  },

  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
