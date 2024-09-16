// Models and Auth will go here

const resolvers = {
  Query: {
    hello: async () => {
      return { hello: "HELLO WORLD" };
    },
  },
};

module.exports = resolvers;
