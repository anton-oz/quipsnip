import { ObjectId } from "mongoose";
import { Post, Profile } from "../models";

import auth from "../utils/GraphQLError";
const { AuthenticationError } = auth;

import TokenGenerator from "../utils/auth2";

import { Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

const testGenerator = new TokenGenerator("publicKey");

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
    /* comments: async () => {
          TODO: get comments from db
       } 
    */
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
      const token = testGenerator.sign(
        { username, _id: idString },
        { expiresIn: "15m" }
      );

      // this token is for issuing new tokens, longer expire time
      const refreshToken = testGenerator.sign(
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
      return { token };
    },
    signup: async (
      _: void,
      { username, password }: { username: string; password: string },
      { res }: { res: Response }
    ) => {
      const profile = await Profile.create({ username, password });
      if (!profile) throw new Error("Could not create profile");
      const token = testGenerator.sign(
        { username, _id: profile._id },
        { expiresIn: "15m" }
      );
      const refreshToken = testGenerator.sign(
        { username, id: profile._id },
        { expiresIn: "1d" }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      });

      return { token };
    },
    logout: async (_: void, __: void, { res }: { res: Response }) => {
      res.clearCookie("refreshToken");
      return true;
    },
    refreshToken: async (_: void, __: void, { req }: { req: Request }) => {
      const refreshToken = req.cookies.refreshToken;
      if ((typeof refreshToken == "string") === false)
        throw new Error("Unauthorized");
      const decoded = jwt.decode(refreshToken);
      try {
        const token /* new token */ = testGenerator.refresh(
          refreshToken /* checking refresh token before issuing new */
          // decoded && typeof decoded !== "string"
          //   ? { jwtid: decoded._id }
          //   : undefined
        );
        return { token };
      } catch (err: any) {
        throw new Error("thrown error: ", err);
      }
    },
  },
};

export default resolvers;
