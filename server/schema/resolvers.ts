import { ObjectId } from "mongoose";
import { Post, Profile } from "../models";

import auth from "../utils/GraphQLError";
const { AuthenticationError } = auth;

import TokenGenerator from "../utils/auth";

import { Request, Response } from "express";

import jwt from "jsonwebtoken";

const testTokenGenerator = new TokenGenerator({ expiresIn: `${10 * 1000}` });

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
          // setting limit to 10 posts, so create multiple queries or another
          // query for getting more posts
          .sort({ createdAt: -1 })
          .limit(10)
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
    // Auth
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

      const { token, refreshToken } = testTokenGenerator.issueTokens(
        { username, _id: idString },
        { expiresIn: "15m" }, // access token options
        { expiresIn: "3d" } // refresh token options
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // expires 3 days from now
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

      const { token, refreshToken } = testTokenGenerator.issueTokens(
        { username, _id: profile._id },
        { expiresIn: "15m" }, // access token options
        { expiresIn: "3d" } // refresh token options
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        maxAge: 20 * 1000, // 1 day
        expires: new Date(Date.now() + 20 * 1000),
      });

      return { token };
    },
    logout: async (_: void, __: void, { res }: { res: Response }) => {
      res.clearCookie("refreshToken");
      return true;
    },
    refreshToken: async (_: void, __: void, { req }: { req: Request }) => {
      const refreshToken = req.cookies.refreshToken;
      const decoded = jwt.decode(refreshToken);
      try {
        if (!decoded) return { token: null, success: false };
        if (typeof decoded !== "string" && decoded?.exp) {
          const exp = decoded.exp;
          const currentTime = Date.now() / 1000;
          if (exp < currentTime) return { token: null, success: false };
        }
        const token /* new access token */ = testTokenGenerator.refresh(
          refreshToken,
          {},
          { expiresIn: `${5 * 1000}` }
        );
        return { token, success: true };
      } catch (err: any) {
        throw new Error("thrown error: ", err);
        /*
          TODO: add error field to return so I can log out user and return the error
        */
        return { token: null, success: false };
      }
    },
    // Posts
    newPost: async (
      _: void,
      {
        type,
        title,
        editor,
        user_id,
      }: { type: string; title: string; editor: string; user_id: ObjectId }
    ) => {
      const newPost = await Post.create({
        type,
        title,
        code: editor,
        user: user_id,
      });
      if (!newPost) throw new Error("Could not create post");
      return true;
    },
  },
};

export default resolvers;
