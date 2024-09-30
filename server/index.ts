import express, { Request, Response } from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schema";

import cookieParser from "cookie-parser";

import connection from "./config/connection";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsConfig = {
  origin: "http://localhost:3000", // will need to change for production
  credentials: true,
};
app.use(cors(corsConfig));

export interface Context {
  req: Request;
  res: Response;
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await apolloServer.start();
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<Context> => ({ req, res }),
    })
  );
  await connection;
  app.listen(PORT, () => {
    console.log(`graphql @ http://localhost:${PORT}/graphql`);
    console.log(`running @ http://localhost:${PORT}`);
  });
  return { server: app };
}

startApolloServer();

export default app;
