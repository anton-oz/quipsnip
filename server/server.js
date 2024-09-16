const express = require("express");
const path = require("path");

const { ApolloServer, gql } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    UNCOMMENT IN PRODUCTION ( ran into same problem as I did with FastAPI )

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
*/
const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`app running @ http://localhost:${PORT}`);
      console.log(`graphql @ http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
