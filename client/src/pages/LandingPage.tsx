import LoginForm from "../components/LoginForm";

export default function LandingPage() {
  return (
    <section className="grid grid-cols-2 items-center place-items-center">
      <div className=" px-12 py-16 flex flex-col items-center justify-center rounded-xl">
        <h1 className="text-7xl font-semibold ">
          {/* 
                                ADD comment, answer cycling in the span below        
          */}
          Have a <span className="text-gradient">Question</span>?
        </h1>
        <p className="pt-5 text-gray-300">Log in or Sign up to get started!</p>
        {/* <a href="/create" className="relative h-full m-4 ">
          <span className="brutalButton create text-4xl font-bold w-max">
            Sign Up
          </span>
        </a> */}
      </div>
      <LoginForm />
    </section>
  );
}
