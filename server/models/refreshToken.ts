import { Model, ObjectId, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface RefreshToken {
  _id: ObjectId;
  user: Schema.Types.ObjectId;
  token: String;
}

const refreshTokenSchema = new Schema<RefreshToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
