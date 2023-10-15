import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    content: true,
    createdAt: true,
    user: {
      select: {
        image: true,
        username: true,
        id: true,
        name: true,
      },
    },
    likes: {
      select: {
        userId: true,
      },
      where: {
        userId: userId ?? "error",
      },
    },
    _count: {
      select: {
        likes: true,
        replies: true,
      },
    },
  } satisfies Prisma.PostSelect);

export const getLatestPosts = (userId?: string) =>
  prisma.post.findMany({
    where: {
      parentId: null,
    },
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: postSelectQuery(userId),
  });

export const getPosView = (postId: string, userId?: string) =>
  prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      ...postSelectQuery(userId),
      replies: {
        select: postSelectQuery(userId),
      },
      parent: {
        select: postSelectQuery(userId),
      },
    },
  });

export const getPost = (postId: string, userId?: string) =>
  prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      ...postSelectQuery(userId),
    },
  });
export type PostHomeType = Prisma.PromiseReturnType<
  typeof getLatestPosts
>[number];
