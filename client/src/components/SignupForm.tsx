import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthContext } from "@/Context/AuthContext";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "@/utils/mutations";

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

// this matches more registration schema and messaging
const signupFormSchema = z.object({
  // remember to make regex's same as db
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9.\-_]{4,20}$/,
      "Username must be between 4 and 20 characters, and can only contain letters, numbers, dashes and underscores."
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "password must be between 8 and 20 characters, contain one uppercase letter, one lowercase leclient/src/components/Nav.tsxtter, one number, and one special character ( @ $ ! % * ? & )."
    ),
});

export default function SignupForm() {
  const Auth = useAuthContext();

  const [signup, { error }] = useMutation(SIGNUP_USER);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    if (values.username && values.password) {
      try {
        const { data } = await signup({
          variables: { ...values },
        });
        if (error) return error;
        if (!Auth) return { error: "error authenticating signup" };
        Auth.login(data.signup.token);
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
        className="space-y-8 w-[90vw] sm:w-[80vw] md:w[70vw] lg:w-[55vw] 2xl:w-[30vw] p-4 bg-zinc-800 rounded border-zinc-700 border"
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
                <FormMessage />
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                      autoComplete="new-password"
                      className="bg-white text-black focus:outline-sky-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />

                <FormDescription className="flex space-x-4 pt-2">
                  {/* <a
                    href="/forgot"
                    className="underline underline-offset-2 hover:underline-offset-[1px] text-sky-400 font-thin hover:text-sky-500 transition-all duration-200"
                  >
                    forgot password?
                  </a>
                  <span>|</span> */}
                  <span>
                    Already Have An Account?{" "}
                    <a
                      href="/login"
                      className="underline underline-offset-2 hover:underline-offset-1 text-sky-400 hover:text-sky-500 transition-all duration-200"
                    >
                      Login
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
