"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { model, set } from "mongoose";
import { on } from "events";
import Thread from "../models/thread.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  username,
  name,
  bio,
  image,
  userId,
  path,
}: Params): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        path,
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
  }
}


export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
    // .populate({
      //   path: 'communities',
      //   model: Community
      // });
    }
    catch (error) {
      console.log(error);
    }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();
    // encontrar todos los posts del usuario con el id userId
    const threads = await User.findOne({ id: userId })
    .populate({
      path: 'threads',
      model: Thread,
      populate: {
        path: 'children',
        model: Thread,
        populate: {
          path: 'author',
          model: User,
          select: 'name image id'
        }
      }
    })
    return threads;
  } catch (error) {
    console.log(error)
  }
};