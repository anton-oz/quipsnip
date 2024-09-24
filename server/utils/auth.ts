import { GraphQLError } from "graphql";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

import { Request, Response, NextFunction } from "express";

const secret = process.env.SECRET || "frigofflahey";
const expiration = "15m"; 

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
  //
  /* I DONT KNOW IF I EVEN NEED THIS LMAO */
  //
  // authMiddleware: (req: CustomRequest, _: void, next: NextFunction) => {
  //   // const token = req.header("Authorization")?.replace("Bearer ", "");

  //   // if (!token) {
  //   //   throw new Error();
  //   // }

  //   // const decoded = jwt.verify(token, secret);
  //   // (req as CustomRequest).token = decoded;

  //   // return req;
  //   let token = req.body.token || req.query.token || req.headers.authorization;

  //   // We split the token string into an array and return actual token
  //   if (typeof token === "string" && req.headers.authorization) {
  //     token = token.split(" ").pop()?.trim();
  //   }

  //   if (!token) {
  //     return next(); // Call next middleware if no token
  //   }

  //   // If token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
  //   try {
  //     const { data } = jwt.verify(token, secret) as { data: any }; // Adjust the type as needed
  //     req.user = data;
  //   } catch (error) {
  //     console.log("Invalid token", error);
  //   }

  //   // Proceed to the next middleware or route handler
  //   next();
  // },
  signToken: ({ username, _id }: { username: string; _id: ObjectId }) => {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
