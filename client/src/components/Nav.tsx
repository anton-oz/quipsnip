import { useState } from "react";
import { Ellipsis } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // const navLinks = ["Create", "Sign up", "Login", "Support Creator"];
  const navLinks = ["About", "Sign up", "Support Creator"];
  const logoDim = 60;

  const menuOnClick = () => {
    setMenuOpen(!menuOpen);
  };

  const stringToLink = (linkName: string) => {
    let link = linkName.toLocaleLowerCase();
    return link.replace(/\s+/g, "");
  };

  return (
    <nav className="w-full px-12 py-6 flex justify-between items-center">
      <a href="/" className="hover:scale-105 transition-all duration-150">
        <img
          src="/nan-logo.svg"
          width={logoDim}
          height={logoDim}
          alt="slides logo"
        />
      </a>
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
          <ul className="w-48 h-full p-2 absolute right-0 top-20 gap-12 flex flex-col items-center justify-start animate-slideIn">
            {navLinks.map((link, i) => (
              <li key={i} className="relative w-full">
                <a href={stringToLink(link)} className="brutalButton">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
