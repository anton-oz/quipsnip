import { useState, useEffect, useRef, FormEvent } from "react";

export default function NoteTextArea() {
  const [content, setContent] = useState("");

  const textAreaDivRef = useRef<HTMLDivElement>(null);

  const placeholder = "Write your note...";

  useEffect(() => {
    if (textAreaDivRef.current) {
      textAreaDivRef.current.innerHTML = placeholder;
    }
  }, [placeholder]);

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    setContent(text);
    console.log("note content: ", content);
  };

  const handleFocus = () => {
    if (
      textAreaDivRef.current &&
      textAreaDivRef.current.innerHTML === placeholder
    ) {
      textAreaDivRef.current.innerHTML = "";
      textAreaDivRef.current.classList.remove("text-gray-500");
    }
    if (textAreaDivRef.current) {
      console.log(textAreaDivRef.current.classList);
    }
  };

  const handleBlur = () => {
    if (
      textAreaDivRef.current &&
      textAreaDivRef.current.innerHTML.trim() === ""
    ) {
      if (!textAreaDivRef.current.classList.contains("text-gray-500")) {
        textAreaDivRef.current.classList.add("text-gray-500");
      }
      textAreaDivRef.current.innerHTML = placeholder;
    }
  };

  return (
    <div className="w-[30%] h-[50%] p-3 bg-white text-black overflow-y-scroll rounded-lg border-4 border-sky-400">
      <div
        ref={textAreaDivRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="h-full w-full box-content text-wrap break-words whitespace-pre-wrap leading-[1.5] outline-none text-gray-500"
      />
    </div>
  );
}
