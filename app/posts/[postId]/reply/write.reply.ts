"use server";

import { WritePostFormValues } from "@/app/write/WritePostForm";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const createPostReply = async (
  parentId: string,
  values: WritePostFormValues
) => {
  const user = await getUser();
  console.log("submit on the server");

  const post = await prisma.post.create({
    data: {
      content: values.content,
      usetId: user.id,
      parentId: parentId,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  revalidatePath(`/posts/${parentId}`);

  return parentId;
};
