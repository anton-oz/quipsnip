import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import MyCodeEditor from "./MyCodeEditor";

import { SquarePlus, ArrowRight } from "lucide-react";

export default function CodeForm() {
  const [hideCodeEditor] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [formState, setFormState] = useState({
    type: "Question",
    postTitle: "",
    editor: "",
  });
  const [placeholder, setPlaceholder] = useState("// your code here\n");

  const postTypes = ["Question", "Snippet"];

  useEffect(() => {
    if (formState.postTitle && formState.editor) {
      setAllowSubmit(true);
      return () => {
        setAllowSubmit(false);
      };
    }
  }, [formState.postTitle && formState.editor]);

  const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // const submittable = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const val = e.target.value;
  //   if (val) {
  //     setAllowSubmit(true);
  //   } else {
  //     setAllowSubmit(false);
  //   }
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //
    //  SAVING THIS CODE IF THERE IS A PROBLEM DISPLAYING POSTS IN FEED
    //
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

      setPlaceholder("// your code here \n");
      return;
    }
    alert("fill out all fields");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="flex flex-col items-center justify-start h-full w-full "
    >
      {/* Div with heading, post type, and post title */}

      <div className="flex w-full justify-start items-center z-20 bg-bgSecondary border-t border-b-2 border-white">
        <div className="p-4 flex flex-col justify-center items-center">
          <h2 className="p-2 text-3xl">New Post</h2>
        </div>
        <div className="p-4 w-fit gap-1 flex flex-col items-center justify-center">
          <label htmlFor="type" className="self-start text-gray-300">
            Post type
          </label>
          <select
            className="w-fit p-2 rounded-md text-black self-start focus:outline-none hover:scale-[1.025] transition-all duration-200"
            defaultValue={formState.type}
            name="type"
          >
            {postTypes.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div
          className={`${
            hideCodeEditor ? "hidden" : "block"
          } p-4 w-fit gap-1 flex flex-col items-center justify-center`}
        >
          <label htmlFor="postTitle" className="self-start text-gray-300">
            {`${formState.type} title`}
          </label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            placeholder={`Enter your ${formState.type.toLocaleLowerCase()}'s title`}
            value={formState.postTitle}
            className="w-96 p-2 rounded-md text-black self-start focus:outline-none hover:scale-[1.01] transition-all duration-200"
          />
        </div>
        {allowSubmit ? (
          <button type="submit" className="relative">
            <span
              className="brutalButton form text-3xl font-medium hover:border-4 hover:border-black"
              style={{ right: -130, top: -20 }}
            >
              Post
            </span>
          </button>
        ) : (
          ""
        )}
      </div>
      {/* Div with tabs */}

      <div className="top-[5.25rem] w-full flex text-2xl">
        <h3 className="p-4 bg-bg border-b-2 border-b-white flex items-center gap-2">
          Tabs <ArrowRight></ArrowRight>
        </h3>
        <button
          type="button"
          className="bg-main text-white p-2 px-[3em] border-b-2 border-b-white border-r-2 border-r-white border-l-2 border-l-white "
        >
          code
        </button>
        <button type="button">
          <SquarePlus
            size={50}
            strokeWidth={1}
            className="hover:scale-[1.05] transition-all duration-200"
          />
        </button>
      </div>
      {/* code editor */}

      <div className="w-[100vw] flex-grow lg:w-[100vw] ">
        <MyCodeEditor
          hidden={hideCodeEditor}
          lang="jsx"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}
