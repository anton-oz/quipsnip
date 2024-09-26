import { Model, ObjectId, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface ProfileInterface {
  _id: ObjectId;
  username: string;
  password: string;
}

interface ProfileMethods {
  passwordMatch(password: string): boolean;
}

type ProfileModel = Model<ProfileInterface, {}, ProfileMethods>;

const profileSchema = new Schema<
  ProfileInterface,
  ProfileModel,
  ProfileMethods
>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9.\-_]{4,20}$/,
      "Username must be between 4 and 12 characters and contain only letters, numbers, periods, hyphens, and underscores!",
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "password must be between 8 and 20 characters, contain one uppercase letter, one lowercase letter, one number, and one special character ( @ $ ! % * ? & ).",
    ],
  },
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
