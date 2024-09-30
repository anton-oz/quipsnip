import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/utils/queries";

import PostCard from "@/components/PostCard";
import TextCycle from "@/components/TextCycle";

import { PostI } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

import { useAuthContext } from "@/Context/AuthContext";

export default function LandingPage() {
  const Auth = useAuthContext();

  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <section className="h-full pb-20 grid grid-cols-auto items-center place-items-center bg-bg">
      <TextCycle
        className={`${Auth?.loggedIn() ? "absolute hidden" : undefined}`}
      />
      <div className="h-fit max-h-[200vh] overflow-y-scroll w-[80vw] lg:w-[70vw] flex flex-col items-center justify-start bg-white bg-opacity-50 rounded-sm gap-4 p-5">
        {loading ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : error ? (
          <>
            <p>error getting data</p>
            <button
              type="button"
              className="relative"
              onClick={() => {
                window.location.reload();
              }}
            >
              <span className="brutalButton -left-14 w-max">Reload Page</span>
            </button>
          </>
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
