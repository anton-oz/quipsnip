import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import Auth from "../utils/auth";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    console.log(Auth.loggedIn());
  }, []);

  // const navLinks = ["Create", "Sign up", "Login", "Support Creator"];
  const navLinks = loggedIn
    ? ["About", "Support Creator", "Logout"]
    : ["About", "Support Creator", "Sign up"];
  const mainLinks = ["Dashboard", "Feed", "Profile"];

  const logoDim = 60;

  const menuOnClick = () => {
    setMenuOpen(!menuOpen);
  };

  const stringToLink = (linkName: string) => {
    const link = linkName.toLocaleLowerCase();
    return link.replace(/\s+/g, ""); // regex to remove spaces
  };

  const logout = () => {
    Auth.logout();
  };

  return (
    <nav className="w-full px-12 py-6 flex justify-between items-center">
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
          <ul className="z-50 w-48 h-[9.33rem]  p-2 absolute right-3 top-[5.5rem] gap-12 flex flex-col items-center justify-start animate-slideIn bg-white bg-opacity-65 rounded-lg">
            {navLinks.map((link, i) =>
              link === "Logout" ? (
                <li key={i} className="relative w-full">
                  <button onClick={logout} className="brutalButton">
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
