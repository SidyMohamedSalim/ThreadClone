import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { PostHomeType } from "../../query/post.query";
import PostLayout from "./PostLayout";

type PostProps = {
  post: PostHomeType;
};

const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex items-start gap-2">
        <Button size={"icon"} variant="ghost">
          <Heart size={20} />
        </Button>
        <Button size={"icon"} variant="ghost">
          <MessageCircle size={20} />
        </Button>
      </div>
      <div>
        <Link
          className="text-muted-foreground text-sm"
          href={`/posts/${post.id}`}
        >
          {post._count.likes} likes
        </Link>
        {"﹒"}
        <Link
          className="text-muted-foreground text-sm"
          href={`/posts/${post.id}`}
        >
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
};

export default Post;
