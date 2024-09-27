/* 
    reworking login form with shadcn
*/

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import { useAuthContext } from "@/Context/AuthContext";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const [login, { error }] = useMutation(LOGIN_USER);
  const Auth = useAuthContext();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    if (values.username && values.password) {
      try {
        const { data } = await login({
          variables: { ...values },
        });
        if (error) return error;
        if (!Auth) return { error: "error authenticating" };
        Auth.login(data.login.token);
      } catch (err) {
        console.error("thrown: ", err);
      }
    } else {
      return alert("fill out both fields");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[90vw] sm:w-[80vw] md:w[70vw] lg:w-[55vw] 2xl:w-[30vw] p-4 bg-zinc-800 rounded border-zinc-700 border "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl className="bg-white text-black">
                  <Input
                    type="text"
                    placeholder="enter your username..."
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="enter your password..."
                      autoComplete="current-password"
                      className="bg-white text-black focus:outline-sky-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className="flex space-x-4 pt-2">
                  <a
                    href="/forgot"
                    className="underline underline-offset-2 hover:underline-offset-[1px] text-sky-400 font-thin hover:text-sky-500 transition-all duration-200"
                  >
                    forgot password?
                  </a>
                  <span>|</span>
                  <span>
                    No Account?{" "}
                    <a
                      href="/signup"
                      className="underline underline-offset-2 hover:underline-offset-1 text-sky-400 hover:text-sky-500 transition-all duration-200"
                    >
                      Signup
                    </a>
                  </span>
                </FormDescription>
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
