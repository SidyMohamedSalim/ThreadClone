"use server";
import { WritePostFormValues } from "./WritePostForm";
import { getUser } from "../../src/query/user.query";
import { prisma } from "@/lib/prisma";
export const createPost = async (values: WritePostFormValues) => {
  const user = await getUser();
  console.log("submit on the server");

  const post = await prisma.post.create({
    data: {
      content: values.content,
      usetId: user.id,
    },
  });
  return post.id;
};
