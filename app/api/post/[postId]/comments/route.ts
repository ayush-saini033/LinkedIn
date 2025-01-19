import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// fetch all comments
export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();
    const post = Post.findById({ _id: params.postId });
    if (!post) return NextResponse.json({ error: "Post not found." });

    const comments = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });
    return NextResponse.json(comments);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: "An unexpected error occurred." });
  }
};
