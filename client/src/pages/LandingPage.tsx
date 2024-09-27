export default function LandingPage() {
  return (
    <section className="grid items-center place-items-center">
      <div className=" px-12 py-16 flex flex-col items-center justify-center rounded-xl">
        <h1 className="text-7xl font-semibold ">
          {/* 
                             ADD comment, answer cycling in the span below        
          */}
          Have a <span className="text-gradient">Question</span>?
        </h1>
        <p className="pt-5 text-gray-300 relative">
          <a href="/login" className="absolute left-0 top-4">
            <span className="brutalButton w-max">Login</span>
          </a>{" "}
          or{" "}
          <a href="/signup" className="w-full mr-[5rem] ">
            <span className="brutalButton w-max left-6 top-4 ">Signup</span>
          </a>{" "}
          to get started!
        </p>
        {/* <a href="/create" className="relative h-full m-4 ">
          <span className="brutalButton create text-4xl font-bold w-max">
            Sign Up
          </span>
        </a> */}
      </div>
    </section>
  );
}
