import React from "react";
import { getUser } from "../../../../src/query/user.query";
import { getPost } from "../../../../src/query/post.query";
import Post from "@/src/feature/posts/Post";
import { notFound } from "next/navigation";
import WritePostForm from "@/app/write/WritePostForm";
import { createPostReply } from "./write.reply";

const page = async ({ params }: { params: { postId: string } }) => {
  const user = await getUser();
  const post = await getPost(params.postId, user.id);
  if (!post) {
    return notFound();
  }

  return (
    <div>
      <Post post={post} />
      <WritePostForm
        user={user}
        onSubmit={async (values) => {
          "use server";
          return createPostReply(post.id, values);
        }}
      />
    </div>
  );
};

export default page;
