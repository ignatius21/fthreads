import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";


const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) return redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  if (!activity) return <p className="head-text">No activity</p>;
  return (
    <section>
        <h1 className='head-text mb-10'>Activity</h1>

        <section className="mt-10 flex flex-col gap-5">
          {activity.length > 0 ? (
            <>
              {activity.map((act) => (
                <Link key={act._id} href={`/thread/${act.parentId}`}>
                  <article className="activity-card">
                    <Image
                      src={act.author.image}
                      alt='profile image'
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {act.author.name}
                      </span> {' '}
                        replied to your thread
                    </p>
                  </article>
                </Link>
              ))}
            </>
          ):(
            <p className="!text-base-regular text-light-3">No activity</p>
          )}
        </section>
    </section>
  )
}

export default Page