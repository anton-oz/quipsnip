import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import MyCodeEditor from "./MyCodeEditor";

export default function CodeForm() {
  const [hideCodeEditor, setHideCodeEditor] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [formState, setFormState] = useState({
    type: "question",
    postTitle: "",
    editor: "",
  });

  const postTypes = ["Question", "Snippet"];

  const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const submittable = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value;
    if (val) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (e.currentTarget !== null) {
    //   const data = new FormData(e.currentTarget);
    //   console.log(data.get("editor"));
    //   console.log(formState);
    // }
    if (formState.editor && formState.postTitle && formState.type) {
      console.log(formState);

      setFormState({
        type: "",
        postTitle: "",
        editor: "",
      });
    }
    alert("fill out all fields");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="gap-2 flex flex-col lg:flex-row items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="p-2 text-3xl">New Post</h2>
        <select
          className="p-1 rounded-md text-black focus:outline-none hover:scale-[1.025] transition-all duration-150"
          defaultValue={formState.type}
          name="type"
        >
          {postTypes.map((item, i) => (
            <option value={item.toLocaleLowerCase()} key={i}>
              {item}
            </option>
          ))}
        </select>
        <div
          className={`${
            hideCodeEditor ? "hidden" : "block"
          } p-4 w-fit gap-1 flex flex-col`}
        >
          <label htmlFor="postTitle" className="self-start text-gray-300">
            {`${formState.type} title`}
          </label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            placeholder={`Enter your ${formState.postTitle}`}
            onChange={submittable}
            value={formState.postTitle}
            className="w-96 p-2 rounded-md text-black self-start focus:outline-none hover:scale-[1.01] transition-all duration-200"
          />
          {allowSubmit ? (
            <button type="submit" className="relative">
              <span className="brutalButton form text-3xl font-medium hover:bg-black hover:text-white hover:border-2 hover:border-white">
                Submit
              </span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-[80vw] lg:w-[50vw]">
        <MyCodeEditor hidden={hideCodeEditor} lang="jsx" />
      </div>
    </form>
  );
}
