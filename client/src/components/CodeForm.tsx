import { FormEvent, ChangeEvent, useState } from "react";
import MyCodeEditor from "./MyCodeEditor";

export default function CodeForm() {
  const [hideCodeEditor] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [formState, setFormState] = useState({
    type: "question",
    postTitle: "",
    editor: "",
  });
  const [placeholder, setPlaceholder] = useState("// your code here\n");

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
        type: "question",
        postTitle: "",
        editor: "",
      });

      // this is weird but it will always reset the placholder on form submit
      setPlaceholder("// your code here\n");
      return;
    }
    alert("fill out all fields");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="gap-2 flex flex-col items-center justify-center"
    >
      <div className="flex w-full justify-start items-center">
        <div className="p-4 flex flex-col justify-center items-center">
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
        </div>
        <div
          className={`${
            hideCodeEditor ? "hidden" : "block"
          } p-4 w-fit gap-1 flex items-center justify-center`}
        >
          {/* <label htmlFor="postTitle" className="self-start text-gray-300">
            {`${formState.type} title`}
          </label> */}
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            placeholder={`Enter your ${formState.type}'s title`}
            onChange={submittable}
            value={formState.postTitle}
            className="w-96 p-2 rounded-md text-black self-start focus:outline-none hover:scale-[1.01] transition-all duration-200"
          />
          {allowSubmit ? (
            <button type="submit" className="relative">
              <span
                className="brutalButton form text-3xl font-medium hover:bg-success hover:border-4 hover:border-black"
                style={{ right: -130, top: -25 }}
              >
                Submit
              </span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-[100vw] h-[60vh] lg:w-[100vw]">
        <MyCodeEditor
          hidden={hideCodeEditor}
          lang="jsx"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}
