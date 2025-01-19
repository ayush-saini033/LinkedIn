import { IPostDocument } from "@/models/post.model";
import React from "react";
import Comment from "./Comment";
import { ICommentDocument } from "@/models/comment.model";


const Comments = ({ post }: { post: IPostDocument }) => {
    console.log(post.comments)
  return (
    <div>
      {post?.comments?.map((comment: ICommentDocument) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
