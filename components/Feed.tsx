import React from 'react'
import PostInput from './PostInput';
import Posts from './Posts ';
import { getAllPosts } from '@/lib/serveraction';
import { IUser } from '@/models/user.model';

const Feed = async ({ user }: { user: IUser | null }) => {
  const userData = JSON.parse(JSON.stringify(user));
  const posts = await getAllPosts();

  return (
    <div className="flex-1">
      <PostInput user={userData} />
      <Posts posts={posts} />
    </div>
  );
};

export default Feed