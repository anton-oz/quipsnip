import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter, // commented out until comments are fully implemented
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MyCodeEditor from "./MyCodeEditor";

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
  return (
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle>{post.type}</CardTitle>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription>
          submitted by{" "}
          <a
            href={`/profile/${post.user.username}`}
            className="cursor-pointer underline hover:text-zinc-700 transition-all duration-150"
          >
            {post.user.username}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MyCodeEditor
          hidden={false}
          readOnly
          placeholder={post.code}
          lang="jsx" // TODO: MAKE DYNAMIC LANG
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
