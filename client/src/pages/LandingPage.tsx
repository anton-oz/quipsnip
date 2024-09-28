import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/utils/queries";

import PostCard from "@/components/PostCard";
import TextCycle from "@/components/TextCycle";

import { PostI } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LandingPage() {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <section className="h-full pb-20 grid grid-cols-auto items-center place-items-center bg-bg">
      <TextCycle />
      <div className="h-[200vh] w-[80vw] lg:w-[70vw] flex flex-col items-center justify-start bg-white bg-opacity-50 rounded-sm gap-4 p-5">
        {loading ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : error ? (
          <p>error getting data</p>
        ) : data ? (
          data.posts.map((post: PostI, i: number) => (
            <PostCard post={post} key={i} />
          ))
        ) : (
          "holy moly"
        )}
      </div>
    </section>
  );
}
