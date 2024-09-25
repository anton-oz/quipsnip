import { ObjectId } from "mongoose";
import { Post, Profile } from "../models";

import auth from "../utils/auth";
const { AuthenticationError, signToken } = auth;

import TokenGenerator from "../utils/auth2";

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profile: async (_: void, { _id }: { _id: ObjectId }) => {
      return Profile.findOne({ _id });
    },
    posts: async () => {
      try {
        const posts = await Post.find()
          .populate("user")

          // populate user in sub documents
          .populate({
            path: "comments",
            populate: { path: "user", model: "Profile" },
          });

        if (!posts) return { error: "no posts" };
        return posts;
      } catch (err) {
        console.error(err);
      }
    },
    // comments: async () => {

    // }
  },
  Mutation: {
    login: async (
      _: void,
      { username, password }: { username: string; password: string }
    ) => {
      // look for profile in db by provided username
      const profile = await Profile.findOne({ username });
      if (!profile) return AuthenticationError;

      // checks if password matches
      const pswd = await profile.passwordMatch(password);
      if (!pswd) return AuthenticationError;

      // if it gets here authentication has completed, so a jwt token is signed
      const token = signToken({
        username: profile.username,
        _id: profile._id,
      });

      // return the token to the user along with profile info
      return { token, profile };
    },
    // logout: {}
  },
};

export default resolvers;
