import { useEffect, useState } from "react";

export default function TextCycle() {
  const [showLetterN, setShowLetterN] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setShowLetterN(!showLetterN);
    }, 4000);
  }, []);
  return (
    <div className=" px-12 py-16 flex flex-col items-center justify-center rounded-xl">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-left relative">
        <span className="text-gradient inline-block animate-textCycle">
          Question
        </span>
        <span className="text-gradient inline-block absolute left-[10%] animate-textCycle2">
          Answer
        </span>
        <span className="text-gradient inline-block absolute left-[10%] animate-textCycle3">
          Snippet
        </span>
        ?
      </h1>
      <p className="text-sm sm:text-2xl pt-8 px-12 text-gray-300 relative left-10">
        <a href="/login" className="absolute left-12 top-7">
          <span className="brutalButton w-max">Login</span>
        </a>{" "}
        or{" "}
        <a href="/signup" className="w-full mr-[6.5rem] ">
          <span className="brutalButton w-max left-20 top-7">Signup</span>
        </a>{" "}
        to get started!
      </p>
    </div>
  );
}
