import { model, ObjectId, Schema } from "mongoose";

import Comment, { CommentInterface, commentSchema } from "./comment";

interface PostInterface {
  _id: ObjectId;
  user: Schema.Types.ObjectId;
  type: string;
  title: string;
  code: string;
  createdAt: Date;
  comments: [CommentInterface];
}

const postSchema = new Schema<PostInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  comments: [commentSchema],
});

const Post = model("Post", postSchema);

export default Post;
