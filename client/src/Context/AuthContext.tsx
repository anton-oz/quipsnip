import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthService } from "./AuthService";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ApolloError, useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "../utils/mutations";

const AuthContext = createContext<AuthService | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const Auth = new AuthService();

  const [viewModal, setViewModal] = useState(false);

  const openModal = () => setViewModal(true);
  const closeModal = () => setViewModal(false);

  const [refreshToken, { error }] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    const timeout = 14 * 60 * 1000;

    if (Auth?.loggedIn()) {
      console.log(Auth.getProfile());
      setTimeout(() => {
        openModal();

        setTimeout(() => {
          const token = Auth.getToken();
          console.log(token);
          const expired = token ? Auth.isTokenExpired(token) : true;
          if (expired) window.location.replace("/");
        }, 1 * 60 * 1000);
      }, timeout);
    }
  }, [Auth.loggedIn()]);

  return (
    <AuthContext.Provider value={Auth}>
      <AlertDialog open={viewModal} onOpenChange={setViewModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You Still There?</AlertDialogTitle>
            <AlertDialogDescription>
              Just making sure you're still there. Click "I'm Here" to stay
              logged in :&#41;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                closeModal();
                Auth.logout();
              }}
            >
              Logout
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                closeModal();
                await refreshToken();
                if (error) throw new ApolloError(error);
              }}
            >
              I'm Here
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {children}
    </AuthContext.Provider>
  );
};
