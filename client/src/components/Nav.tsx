import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
// import Auth from "../utils/auth";

import { useAuthContext } from "../Context/AuthContext";

import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "@/utils/mutations";

import { handleLogout } from "@/lib/utils";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const Auth = useAuthContext();

  const [logout, { error }] = useMutation(LOGOUT_USER);

  useEffect(() => {
    if (Auth?.loggedIn()) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [Auth?.loggedIn]);

  // const navLinks = ["Create", "Sign up", "Login", "Support Creator"];
  const navLinks = loggedIn
    ? ["About", "Support Creator", "Logout"]
    : ["About", "Support Creator", "Login", "Sign up"];
  const mainLinks = ["Post", "Feed", "Profile"];

  const logoDim = 60;

  const menuOnClick = () => {
    setMenuOpen(!menuOpen);
  };

  const stringToLink = (linkName: string) => {
    const link = linkName.toLocaleLowerCase();
    return link.replace(/\s+/g, ""); // regex to remove spaces
  };

  // const handleLogout = async () => {
  //   await logout();
  //   if (error) throw new ApolloError(error);
  //   Auth?.logout();
  // };

  return (
    <nav className="w-full px-12 py-6 z-30 flex justify-between items-center nav-gradient">
      <a href="/" className="transition-all duration-200">
        <img
          src="/nan-logo.svg"
          width={logoDim}
          height={logoDim}
          alt="slides logo"
        />
        QuipSnip
      </a>
      {loggedIn ? (
        <ul className="w-[20em] flex gap-4 items-center justify-center">
          {mainLinks.map((item, i) => (
            <li key={i} className="relative w-full">
              <a
                href={stringToLink(item)}
                className="brutalButtonMainLinks text-center"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-col justify-start items-center overflow-hidden">
        <button onClick={menuOnClick}>
          <Ellipsis
            size={40}
            className={
              (menuOpen ? "rotate-90" : "") +
              " " +
              "tranisiton-all duration-200 hover:scale-105"
            }
          />
        </button>
        {menuOpen ? (
          <ul className="z-[10000] w-48 h-[12.33rem]  p-2 absolute right-3 top-[5.5rem] gap-12 flex flex-col items-center justify-start animate-slideIn bg-zinc-300 bg-opacity-80 rounded-lg">
            {navLinks.map((link, i) =>
              link === "Logout" ? (
                <li key={i} className="relative w-full">
                  <button
                    onClick={() => handleLogout(logout, error, Auth)}
                    className="brutalButton"
                  >
                    {link}
                  </button>
                </li>
              ) : (
                <li key={i} className="relative w-full">
                  <a href={stringToLink(link)} className="brutalButton">
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
