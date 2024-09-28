/*
    Reworking Post Form
*/

// import React from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import MyCodeEditor from "./MyCodeEditor";

import { useMutation } from "@apollo/client";
import { NEW_POST } from "../utils/mutations";

import { useAuthContext } from "../Context/AuthContext";

const codeFormSchema = z.object({
  user_id: z.string({
    required_error: "user id required",
  }),
  type: z.string({
    required_error: "select a type of post",
  }),
  title: z
    .string({
      required_error: "title required",
    })
    .regex(/^[a-zA-Z\ \d]+$/, "No Special Characters"),
  editor: z.union([z.string(), z.instanceof(File)]),
});

export default function CodeForm() {
  const [newPost, { error }] = useMutation(NEW_POST);

  const Auth = useAuthContext();

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      user_id: "",
      type: "",
      title: "",
      editor: "// enter your code here\n",
    },
  });

  async function onSubmit(values: z.infer<typeof codeFormSchema>) {
    const profile = Auth?.getProfile();
    console.log("profile", profile);
    if (profile) {
      if ("error" in profile) {
        throw new Error(profile.error);
      } else {
        values.user_id = profile?._id;
      }
    } else throw new Error("No Profile Found");
    if (formRef.current) {
      console.log(formRef.current);
      const data = new FormData(formRef.current);
      // const stringData = JSON.stringify(data.get("editor"));
      const editorData = data.get("editor");
      if (editorData) {
        values.editor = editorData;
      }
    }
    if (values.user_id && values.type && values.title && values.editor) {
      try {
        console.log(values);
        const { data } = await newPost({
          variables: { ...values },
        });
        if (error) return error;
        if (!Auth) return { error: "error authenticating" };
        Auth.login(data.login.token);
      } catch (err) {
        console.error("thrown: ", err);
      }
    }
  }

  const postTypes = ["Question", "Snippet"];

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-start space-x-10 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="enter your title..." {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of your post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-[20%] min-w-max">
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a post type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {postTypes.map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>This is the type of post</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="editor"
          render={({ field }) => (
            <MyCodeEditor
              hidden={false}
              lang="typescript"
              placeholder={
                typeof field.value === "string"
                  ? field.value
                  : JSON.stringify(field.value)
              }
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
