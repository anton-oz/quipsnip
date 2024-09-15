import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
export default function App() {
  return (
    <>
      <Nav />
      <main className="w-screen h-screen">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
