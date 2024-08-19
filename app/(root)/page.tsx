
import { fetchPosts } from "@/lib/actions/thread.actions";
import { formatDateString } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  const results = await fetchPosts(1,10);
  const user = await currentUser();
  return (
    <>
      <h1 className="head-text">Home</h1>
    <section className="mt-9 flex flex-col gap-10">
      {results.posts.length === 0 ? (
        <p>No post</p>
      ): (
        results.posts.map((post) => (
          <ThreadCard
            key={post._id}
            id={post._id}
            post={post}
            currentUserId= {user?.id}
            parentId={post.parentId}
            content={post.text}
            author={post.author}
            community={post.community}
            createdAt={formatDateString(post.createdAt)}
            comments={post.children}
          />
        ))
      )}
    </section>
    </>
  );
}
