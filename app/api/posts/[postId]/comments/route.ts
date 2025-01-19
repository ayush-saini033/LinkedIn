import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Fetch all comments
export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // Extract the postId from the URL using req.nextUrl
    const postId = req.nextUrl.pathname.split("/").at(-2); // Assumes /api/posts/[postId]/comments

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      );
    }

    // Await the post search to ensure it's resolved
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Populate comments and sort by createdAt descending
    const populatedPost = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    return NextResponse.json(populatedPost.comments); // Return only the comments
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
