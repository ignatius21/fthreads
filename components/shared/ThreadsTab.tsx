import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { formatDateString } from "@/lib/utils";

interface Params {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Params) => {

  let result = await fetchUserPosts(accountId);

  if(!result) redirect('/');
  return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                content={thread.text}
                author={accountType === 'User'? {name: result.name, image: result.image, id:result.image} : {name: thread.author.name,  image: thread.author.image, id: thread.author.id}}
                community={thread.community}
                createdAt={formatDateString(thread.createdAt)}
                comments={thread.children}
                isComment={true}
            />
            ))}
        </section>
    );
};

export default ThreadsTab;
