import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "./env";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile, tokens) {
        console.log(profile);

        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      name: "",

      credentials: {
        email: { label: "email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Missing credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !(await compare(password, user.password ?? ""))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session.user) {
        return session;
      }
      session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession();
  return session;
};
