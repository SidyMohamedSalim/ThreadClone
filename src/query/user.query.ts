import { getAuthSession } from "../../lib/authOptions";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { postSelectQuery } from "./post.query";
import { TypeOf } from "zod";

const userQuery = {
  id: true,
  name: true,
  image: true,
  bio: true,
  createdAt: true,
  link: true,
} satisfies Prisma.UserSelect;

export const getUser = async () => {
  const session = await getAuthSession();
  if (!session?.user.email) {
    throw new Error("No User Found");
  }
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });
  return user;
};

export const getUserProfile = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      ...userQuery,
      _count: {
        select: {
          followeds: true,
          followers: true,
        },
      },
      posts: {
        select: postSelectQuery(userId),
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
      followeds: {
        select: {
          follower: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
            },
          },
        },
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export type userProfileType = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;
