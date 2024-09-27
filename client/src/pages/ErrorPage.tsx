import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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
      <div className="flex space-x-[10rem] relative">
        <a href="/" className="relative ml-[4rem]">
          <span className="brutalButtonMiddle w-max">Go home</span>
        </a>
        <button type="button" onClick={goBack} className="relative">
          <span className="brutalButtonMiddle w-max">Go back</span>
        </button>
      </div>
    </section>
  );
}
