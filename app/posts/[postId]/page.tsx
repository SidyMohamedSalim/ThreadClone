import React from "react";
import { prisma } from "../../../lib/prisma";
import { getAuthSession } from "../../../lib/authOptions";
import { getPosView } from "../../../src/query/post.query";
import { notFound } from "next/navigation";
import Post from "@/src/feature/posts/Post";
import clsx from "clsx";

type pageProps = {
  params: {
    postId: string;
  };
};

const page = async ({ params }: pageProps) => {
  const session = await getAuthSession();

  const post = await getPosView(params.postId, session?.user.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="divide-y divide-accent">
      {post.parent && <Post post={post.parent} key={post.parent.id} />}

      <div className={clsx({ "ml-10": post.parent })}>
        <Post post={post} key={post.id} />
        <div className="ml-10 divide-y divide-accent ">
          {post.replies.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
