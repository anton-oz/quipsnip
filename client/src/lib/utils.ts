import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ApolloError } from "@apollo/client";
import { MutationFunction } from "@apollo/client";
import { AuthService } from "@/Context/AuthService";
import { ApolloErrorOptions } from "@apollo/client/errors";

export const handleLogout = async (
  logoutFunction: MutationFunction<any, any>,
  error: ApolloErrorOptions | undefined,
  Auth: AuthService | null
) => {
  try {
    await logoutFunction();
    if (error) throw new ApolloError(error);
    Auth?.logout();
  } catch (err) {
    console.error("Logout error:", err);
    // Handle error (e.g., show a notification)
  }
};
