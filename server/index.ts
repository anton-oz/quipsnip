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

interface Context {
  req: Request;
  res: Response;
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req, res }: { req: Request; res: Response }) => ({
  //   req: Request,
  //   res: Response,
  // }),
});

async function startApolloServer() {
  await apolloServer.start();
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<Context> => ({ req, res }),
    })
  );
  // connecting to mongoDB
  await connection;

  app.listen(PORT, () => {
    console.log(`graphql @ http://localhost:${PORT}/graphql`);
    console.log(`running @ http://localhost:${PORT}`);
  });
}

startApolloServer();
