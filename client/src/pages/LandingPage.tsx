import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/utils/queries";
import PostCard from "@/components/PostCard";

import { PostI } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LandingPage() {
  const { loading, error, data } = useQuery(GET_POSTS);

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
      <div className="h-[200vh] w-[80vw] lg:w-[70vw] flex flex-col items-center justify-start bg-white bg-opacity-50 rounded-sm gap-4 p-5">
        {loading ? (
         <LoaderCircle size={20} className="animate-spin" />
        ) : error ? (
          <p>error getting data</p>
        ) : data ? (
          data.posts.map((post: PostI, i: number) => (
            <PostCard post={post} key={i}/>
          ))
        ) : (
          "holy moly"
        )}
      </div>
    </section>
  );
}
