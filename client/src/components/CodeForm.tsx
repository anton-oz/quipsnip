import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import MyCodeEditor from "./MyCodeEditor";

export default function CodeForm() {
  const [hideCodeEditor, setHideCodeEditor] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);

  const postTypes = ["Question", "Share a snippet"];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget !== null) {
      const data = new FormData(e.currentTarget);
      console.log(data.get("editor"));
    }
  };

  useEffect(() => {
    selectedType === "" ? setHideCodeEditor(true) : setHideCodeEditor(false);
  }, [selectedType]);

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-2 flex flex-col items-center justify-center"
    >
      <h2 className="text-3xl">New Post</h2>
      <select
        className="p-1 rounded-md text-black focus:outline-none hover:scale-[1.025] transition-all duration-150"
        value={selectedType}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        {postTypes.map((item, i) => (
          <option value={item.toLocaleLowerCase().replace(/ /g, "-")} key={i}>
            {item}
          </option>
        ))}
      </select>
      <div
        className={`${
          hideCodeEditor ? "hidden" : "block"
        } w-full gap-1 flex flex-col`}
      >
        <label htmlFor="postTitle" className="self-start text-gray-300">
          Post Title
        </label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          placeholder={`${"woo"}`}
          className="p-2 rounded-md text-black self-start focus:outline-none hover:shadow-mainSecondary hover:shadow-md transition-all duration-200"
        />
      </div>
      <MyCodeEditor hidden={hideCodeEditor} lang="jsx" />

      {allowSubmit ? (
        <button type="submit" className="relative">
          <span className="brutalButton form text-3xl font-medium hover:bg-black hover:text-white hover:border-2 hover:border-white">
            Submit
          </span>
        </button>
      ) : (
        ""
      )}
    </form>
  );
}
