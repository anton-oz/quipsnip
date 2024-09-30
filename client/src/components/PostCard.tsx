import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter, // commented out until comments are fully implemented
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MyCodeEditor from "./MyCodeEditor";
import { useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";

interface Post {
  user: {
    username: string;
  };
  type: string;
  title: string;
  code: string;
  comments: [
    {
      text: string;
      user: {
        username: string;
      };
    }
  ];
}

export default function PostCard({ post }: { post: Post }) {
  const [showArrow, setShowArrow] = useState(false);

  return (
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle>{post.type}</CardTitle>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription>
          submitted by{" "}
          <a
            href={`/profile/${post.user.username}`}
            className="relative cursor-pointer underline text-zinc-600 hover:text-zinc-800 transition-all duration-150"
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
          >
            {post.user.username}
            {showArrow ? (
              <SquareArrowOutUpRight
                size={11}
                color="black"
                className="absolute top-[0.35rem] left-[2.65rem]"
              />
            ) : null}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MyCodeEditor
          hidden={false}
          readOnly
          placeholder={post.code}
          lang="jsx" // TODO: MAKE DYNAMIC LANG
          feed
        />
      </CardContent>
      {/* 
        Commented out until comments are working
      */}
      {/* <CardFooter className="flex flex-col">
        <p>comments</p>
        {post.comments.map((comment, i) => (
          <p
            key={i}
            className="p-2 flex flex-col bg-zinc-700 rounded text-white"
          >
            {comment.text}{" "}
            <span className="text-zinc-300">{comment.user.username}</span>
          </p>
        ))}
      </CardFooter> */}
    </Card>
  );
}
