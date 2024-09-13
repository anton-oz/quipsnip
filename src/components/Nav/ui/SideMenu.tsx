import { X } from "lucide-react";

interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideMenu({ active, setActive }: Props) {
  // if (!active) return null;

  return (
    <div
      role="sidemenu"
      className={`${
        active
          ? "visible translate-x-0 opacity-100"
          : "invisible translate-x-52 opacity-0"
      } w-[15vw] h-screen absolute right-0 gap-5 flex flex-col items-center justify-center bg-rose-300 border-l-4 text-2xl transition-transform ease-in-out duration-200`}
    >
      <X
        size={50}
        className="absolute top-4 right-6 bg-inherit hover:scale-105 hover:cursor-pointer"
        onClick={() => {
          setTimeout(() => {
            setActive(false);
          }, 100);
        }}
      />
      {["link 1", "link 2", "link 3", "link 4"].map((link, i) => (
        <a className="brutalButton min-w-[66%] text-center" href="#" key={i}>
          {link}
        </a>
      ))}
    </div>
  );
}
