import React from 'react'

import { currentUser } from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';


const Page = async () => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) return redirect('/onboarding');

  return (
    <>
        <h1 className="head-text">Create Thread</h1>;
        <PostThread userId={userInfo._id}/>
    </>
  )
};

export default Page;