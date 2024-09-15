import { useQuery } from "@apollo/client";
import NoteTextArea from "../components/NoteTextArea";
import { HELLO_QUERY } from "../utils/queries";
import { useEffect } from "react";

export default function CreatePage() {
  // const { loading, error, data } = useQuery(HELLO_QUERY);
  const { data } = useQuery(HELLO_QUERY);

  useEffect(() => {
    data ? console.log(data) : "invalid";
  }, [data]);

  return (
    <section className="h-[70%] w-full flex justify-center items-center">
      <NoteTextArea />
    </section>
  );
}
