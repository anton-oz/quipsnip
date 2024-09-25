import { GraphQLError } from "graphql";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

import { Request, Response, NextFunction } from "express";

const secret = process.env.SECRET || "frigofflahey";
const expiration = "1h";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  user?: any;
}

export default {
  AuthenticationError: new GraphQLError("could not authenticate user", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  signToken: ({ username, _id }: { username: string; _id: ObjectId }) => {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
