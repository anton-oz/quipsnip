import * as React from "react";

import { cn } from "@/lib/utils";

import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [renderEye] = React.useState(type === "password");
    const [showPassword, setShowPassword] = React.useState(false);

    const eyeProps = {
      size: 25,
      strokeWidth: 2,
      color: "black",
      className: "absolute top-1 right-2 hover:cursor-pointer",
      onClick: () => setShowPassword(!showPassword),
    };

    return (
      <>
        <input
          type={renderEye ? (showPassword ? "text" : "password") : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className
          )}
          ref={ref}
          {...props}
        />
        {renderEye ? (
          showPassword ? (
            <EyeOffIcon {...eyeProps} />
          ) : (
            <EyeIcon {...eyeProps} />
          )
        ) : null}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
