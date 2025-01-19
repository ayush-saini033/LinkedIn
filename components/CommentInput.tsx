"use client";
import React, { FormEvent } from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCommentAction } from "@/lib/serveraction";

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const commentActionHandler = async (formData: FormData) => {
    console.log(formData)
    try {
      if (!user) throw new Error("User not authenticated");
      await createCommentAction(postId, formData);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    commentActionHandler(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <ProfilePhoto src={user?.imageUrl || "/banner.jpg"} />
        <Input
          type="text"
          name="inputText"
          placeholder="Add a comment"
          className="rounded-full"
        />
        <Button type="submit" variant={"outline"} className="rounded-full">
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
