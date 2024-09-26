import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { AuthProvider } from "./Context/AuthContext";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Nav />
        <main className="w-screen h-screen">
          <Outlet />
        </main>
        <footer className="text-white bottom-0">
          <p>footer</p>
        </footer>
      </AuthProvider>
    </ApolloProvider>
  );
}
