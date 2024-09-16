/*
        UNCOMMENT WHEN LOGIN IMPLEMENTED
*/
// import LoginForm from "../components/LoginForm";

export default function LandingPage() {
  return (
    /*
                UNCOMMENT WHEN LOGIN IMPLEMENTED 
      */
    /* <main className="w-screen h-screen grid grid-cols-2"> */
    <section className="flex flex-col justify-start items-center">
      <div className="mt-40 px-12 py-16 flex flex-col items-center justify-center rounded-xl">
        <h1 className="text-7xl font-semibold ">
          Have a <span className="text-gradient">Question?</span>
        </h1>
        <a href="/create" className="relative h-full m-4 ">
          <span className="brutalButton create text-4xl font-bold w-max">
            Get Started
          </span>
        </a>
      </div>
    </section>
    /* 
                UNCOMMENT WHEN LOGIN IMPLEMENTED
        */
    /* <section className="flex flex-col justify-start items-center">
          <LoginForm />
        </section> */
  );
}
