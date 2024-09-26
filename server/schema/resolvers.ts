import { ObjectId } from "mongoose";
import { Post, Profile } from "../models";

import auth from "../utils/GraphQLError";
const { AuthenticationError } = auth;

import TokenGenerator from "../utils/auth2";

import { Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

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
      { username, password }: { username: string; password: string },
      { res }: { res: Response }
    ) => {
      // look for profile in db by provided username
      const profile = await Profile.findOne({ username });
      if (!profile) return AuthenticationError;

      // checks if password matches
      const pswd = await profile.passwordMatch(password);
      if (!pswd) return AuthenticationError;

      const idString = profile._id.toString();

      // if it gets here authentication has completed, so a jwt token is signed
      const token = new TokenGenerator(idString, {}).sign(
        { username, _id: idString },
        { expiresIn: "10m" }
      );

      // this token is for issuing new tokens, longer expire time
      const refreshToken = new TokenGenerator(idString, {}).sign(
        { username, _id: idString },
        { expiresIn: "1d" }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      });

      // return the token to the user along with profile info
      return { token, profile };
    },
    refreshToken: async (_: void, __: void, { req }: { req: Request }) => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw new Error("Unauthorized");
      try {
        const token /* new token */ = new TokenGenerator(
          "randomkey" /* need to change this */,
          {}
        ).refresh(refreshToken /* checking refresh token before issuing new */);
        return { token };
      } catch (err: any) {
        throw new Error("thrown error: ", err);
      }
    },
  },
};

export default resolvers;
