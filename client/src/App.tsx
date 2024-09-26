import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { AuthProvider } from "./Context/AuthContext";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include", // This enables sending cookies
});

const client = new ApolloClient({
  link: httpLink,
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
