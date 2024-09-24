import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schema";

import connection from "./config/connection";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const corsConfig = {
  origin: "http://localhost:3000", // will need to change for production
  credentials: true,
};
app.use(cors(corsConfig));

const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));

  // connecting to mongoDB
  await connection;

  app.listen(PORT, () => {
    console.log(`graphql @ http://localhost:${PORT}/graphql`);
    console.log(`running @ http://localhost:${PORT}`);
  });
}

startApolloServer();
