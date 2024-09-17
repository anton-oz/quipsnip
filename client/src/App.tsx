import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

// THIS IS TEMPORARY, MOVE TO CONTEXT FILE
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <main className="w-screen h-screen">
        <Outlet />
      </main>
      <footer className="text-white bottom-0">
        <p>footer</p>
      </footer>
    </ApolloProvider>
  );
}
