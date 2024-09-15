import { useState, useEffect, useRef, FormEvent } from "react";

export default function NoteTextArea() {
  const [content, setContent] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const placeholder = "Write your note...";

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = placeholder;
    }
  }, [placeholder]);

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    setContent(text);
    console.log("note content: ", content);
  };

  const handleFocus = () => {
    if (divRef.current && divRef.current.innerHTML === placeholder) {
      divRef.current.innerHTML = "";
    }
    if (divRef.current) {
      console.log(divRef.current.classList);
    }
  };

  const handleBlur = () => {
    if (divRef.current && divRef.current.innerHTML.trim() === "") {
      divRef.current.innerHTML = placeholder;
    }
  };

  return (
    <div className="w-[30%] h-[50%] p-3 bg-white text-black overflow-y-scroll rounded-lg border-4 border-sky-400">
      <div
        ref={divRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="h-full w-full box-content text-wrap break-words whitespace-pre-wrap leading-[1.5] outline-none"
      />
    </div>
  );
}
