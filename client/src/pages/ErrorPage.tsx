import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <div className="bg-white mb-10">
        <div>
          {isRouteErrorResponse(error) ? (
            <>
              <div className="text-center bg-black p-4">
                <p>{error.status}</p> <p>{error.statusText}</p>
              </div>
              <p className="p-4 text-xl text-black">{error.data}</p>
            </>
          ) : (
            <p className="text-black">unkown error...</p>
          )}
        </div>
      </div>
      <a href="/" className="relative w-full">
        <span className="brutalButtonMiddle">Go home</span>
      </a>
    </section>
  );
}
