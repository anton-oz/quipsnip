import { model, Schema, ObjectId } from "mongoose";

export interface CommentInterface {
  _id: ObjectId;
  text: string;
  user: Schema.Types.ObjectId;
}

export const commentSchema = new Schema<CommentInterface>({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

export default Comment;
