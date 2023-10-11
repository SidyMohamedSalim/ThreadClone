import { getAuthSession } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import Post from "@/src/feature/posts/Post";
import { getLatestPosts } from "@/src/query/post.query";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts(session?.user.id);

  return (
    <div className="divide-y divide-muted">
      {posts.map((p) => (
        <Post post={p} key={p.id} />
      ))}
    </div>
  );
}
