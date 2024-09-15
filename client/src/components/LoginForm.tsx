import { useState, FormEvent, ChangeEvent } from "react";

export default function LoginForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    setFormState({ username: "", password: "" });
  };
  return (
    <div className="mt-40 py-14 px-8 flex flex-col items-center justify-center border-2 border-black rounded-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 text-xl"
      >
        <h2 className="text-4xl">Login</h2>
        <input
          name="username"
          value={formState.username}
          onChange={handleChange}
          type="text"
          placeholder="username"
          className="p-2 border-2 border-black rounded-md"
        />
        <input
          name="password"
          value={formState.password}
          onChange={handleChange}
          type="password"
          placeholder="password"
          className="p-2 border-2 border-black rounded-md"
        />
        <button type="submit" className="relative">
          <span className="brutalButton form">login</span>
        </button>
      </form>
    </div>
  );
}
