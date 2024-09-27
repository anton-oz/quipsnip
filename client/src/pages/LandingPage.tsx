import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/utils/queries";
import React from "react";

export default function LandingPage() {
  const { loading, error, data } = useQuery(GET_POSTS);

  React.useEffect(() => {
    console.log(JSON.stringify(data, null, 2));
  }, [data]);

  return (
    <section className="h-full pb-20 grid grid-cols-auto items-center place-items-center bg-bg">
      <div className=" px-12 py-16 flex flex-col items-center justify-center  rounded-xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-left">
          {/* 
                           ADD comment, answer cycling in the span below        
          */}
          Have a <span className="text-gradient">Question</span>?
        </h1>
        <p className="text-sm sm:text-base pt-5 text-gray-300 relative">
          <a href="/login" className="absolute left-0 top-4">
            <span className="brutalButton w-max">Login</span>
          </a>{" "}
          or{" "}
          <a href="/signup" className="w-full mr-[5rem] ">
            <span className="brutalButton w-max left-6 top-4 ">Signup</span>
          </a>{" "}
          to get started!
        </p>
      </div>
      <div className="h-[200vh] w-[80vw] lg:w-[70vw] flex flex-col items-center justify-start bg-white bg-opacity-50 gap-4 p-5">
        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <p>error getting data</p>
        ) : data ? (
          /* 
              TODO: MAKE A POST INTERFACE
          */
          data.posts.map((post: any, i: number) => (
            <div key={i}>
              <h3>title: {post.title}</h3>
              <p>user: {post.user.username}</p>
              <p className="bg-black">query info:</p>
              <textarea className="h-[50vh] w-[20vw] text-black ">
                {JSON.stringify(post, null, 2)}
              </textarea>
            </div>
          ))
        ) : (
          "holy moly"
        )}
      </div>
    </section>
  );
}
