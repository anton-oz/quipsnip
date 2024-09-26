import { GraphQLError } from "graphql";

export default {
  AuthenticationError: new GraphQLError("could not authenticate user", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  })
};
