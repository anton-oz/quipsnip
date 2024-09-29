import { ReactNode, createContext, useContext, useEffect } from "react";

import { AuthService } from "./AuthService";

import { ApolloError, useMutation } from "@apollo/client";
import { LOGOUT_USER, REFRESH_TOKEN } from "../utils/mutations";

const AuthContext = createContext<AuthService | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const Auth = new AuthService();

  const [refreshToken, { error: refreshError }] = useMutation(REFRESH_TOKEN);
  const [logout, { error: logoutError }] = useMutation(LOGOUT_USER);

  useEffect(() => {
    // interval to auto refresh token in background
    const interval = 14 * 60 * 1000;
    if (Auth?.loggedIn()) {
      const refresher = setInterval(async () => {
        const refresh = await refreshToken();
        if (refreshError) throw new ApolloError(refreshError);
        if (refresh.errors) return console.error(refresh.errors);
        if (refresh?.data) {
          if (!refresh.data.refreshToken.success) {
            console.log(refresh.data.refreshToken.success);
            await logout();
            if (logoutError) throw new ApolloError(logoutError);
            Auth.logout();
            return clearInterval(refresher);
          }
          Auth.refresh(refresh.data.refreshToken.token);
        }
      }, interval);
    }
  }, []);

  return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>;
};
