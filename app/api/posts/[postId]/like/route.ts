import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Get likes
export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const postId = req.nextUrl.pathname.split("/").at(-2); // Extract postId from URL
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json(post.likes);
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

// Post likes (add like)
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const postId = req.nextUrl.pathname.split("/").at(-2); // Extract postId from URL
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      );
    }

    const { userId } = await req.json(); // Assuming the body contains a userId
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await post.updateOne({ $addToSet: { likes: userId } }); // Adding userId to likes if not already present
    return NextResponse.json({ message: "Post liked successfully." });
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
