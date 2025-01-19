import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Post dislikes
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    // Extract the postId from the URL
    const postId = req.nextUrl.pathname.split("/").at(-2); // Assumes /api/posts/[postId]/dislike
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      );
    }

    // Get userId from the request body
    const { userId } = await req.json(); // Assuming userId is passed as part of the request body
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Use postId to find the post
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Update the post by pulling the userId from the likes array
    await post.updateOne({ $pull: { likes: userId } });

    return NextResponse.json({ message: "Post disliked successfully." });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};
