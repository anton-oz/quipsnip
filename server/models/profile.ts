import { Model, ObjectId, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface Profile {
  _id: ObjectId;
  username: string;
  password: string;
}

interface ProfileMethods {
  passwordMatch(password: string): boolean;
}

type ProfileModel = Model<Profile, {}, ProfileMethods>;

const profileSchema = new Schema<Profile, ProfileModel, ProfileMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9.\-_]{4,12}$/,
      "Username must be between 4 and 12 characters and contain only letters, numbers, periods, hyphens, and underscores!",
    ],
  },
  password: { type: String, required: true, minlength: 4 },
});

// middleware to hash password before saving to db
profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// method to check passsword
profileSchema.method("passwordMatch", function passwordMatch(password: string) {
  return bcrypt.compare(password, this.password);
});

const Profile = model("Profile", profileSchema);

export default Profile;
