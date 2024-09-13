import { useState } from "react";

import { Menu } from "lucide-react";

import SideMenu from "./ui/SideMenu";

export default function Nav() {
  const [active, setActive] = useState(false);

  return (
    <>
      <nav className="w-full h-fit py-4 px-8 absolute top-0 flex justify-between items-center">
        <header>
          <h1 className="h-fit text-5xl font-light ">Slides</h1>
        </header>
        <Menu
          size={40}
          className="border-[3px] rounded-md hover:cursor-pointer hover:scale-105"
          onClick={() => {
            setTimeout(() => {
              setActive(true);
            }, 100);
          }}
        />
      </nav>
      <SideMenu active={active} setActive={setActive} />
    </>
  );
}
