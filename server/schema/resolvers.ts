import { Profile } from "../models";

import auth from "../utils/auth";
const { AuthenticationError, signToken } = auth;

const resolvers = {
  Query: {
    hello: () => "hello",
    profiles: async () => {
      return Profile.find();
    },
    profile: async (_: void, { username }: { username: string }) => {
      return Profile.findOne({ username });
    },
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
