import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { AuthProvider } from "./Context/AuthContext";
import Footer from "./components/Footer";

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
        {/* if this div isnt here */}
        <div className="flex flex-col relative h-full">
          {/* the whole thing renders improperly */}
          <Nav />
          <main className="w-screen flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}
