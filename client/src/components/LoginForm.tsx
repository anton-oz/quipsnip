import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

export default function LoginForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = JSON.stringify({ ...formState });
    try {
      console.log("data sent to graphql: ", x);
      const { data } = await login({
        variables: { ...formState },
      });
      if (error) throw error;
      Auth.login(data.login.token);
    } catch (err) {
      console.error("thrown: ", err);
    }
    setFormState({ username: "", password: "" });
  };
  return (
    <div className="h-fit w-fit mt-14 px-8 py-6 gap-4 flex flex-col items-center justify-center border-2 border-gray-500 rounded-md bg-bgSecondary">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 text-xl"
      >
        {/* <h2 className="text-4xl">Login</h2> */}
        <label htmlFor="username" className="w-full text-left">
          Username
        </label>
        <input
          name="username"
          value={formState.username}
          onChange={handleChange}
          type="text"
          placeholder="username"
          className="w-80 p-2 border-2 border-white rounded-md text-black focus:outline-none hover:scale-[1.025] transition-all duration-200"
        />
        <label htmlFor="password" className="w-full text-left">
          Password
        </label>
        <input
          name="password"
          value={formState.password}
          onChange={handleChange}
          type="password"
          placeholder="password"
          className="w-80 p-2 border-2 border-white rounded-md text-black focus:outline-none  hover:scale-[1.025] transition-all duration-200"
        />
        <button
          type="submit"
          className="py-2 px-4 border-2 border-white rounded-md bg-black hover:bg-white hover:text-black transition-all duration-100"
        >
          Login
        </button>
      </form>
      <p className="w-full text-left">
        No Account?{" "}
        <a
          href="/signup"
          className="underline underline-offset-2 hover:underline-offset-1 hover:text-main transition-all duration-200"
        >
          Signup
        </a>
      </p>
    </div>
  );
}
