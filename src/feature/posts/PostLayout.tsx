import React, { PropsWithChildren } from "react";
import { PostHomeType } from "../../query/post.query";
import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, User2 } from "lucide-react";
import { formatDate } from "../../utils/formatdate";
import Link from "next/link";

type PostLayoutProps = {
  user: PostHomeType["user"];
  postId?: PostHomeType["id"];
  createdAt?: PostHomeType["createdAt"];
  className?: string;
};

const PostLayout = ({
  user,
  createdAt,
  children,
  className,
}: PropsWithChildren<PostLayoutProps>) => {
  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username ?? ""} />
        ) : null}
        <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="ml-4  flex w-full flex-col gap-2">
        <Link href={`/user/${user.id}}`}>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-card-foreground mr-auto font-bold">
              {user.name}
            </p>
            {createdAt ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}
            <button>
              <MoreHorizontal size={20} />
            </button>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default PostLayout;
