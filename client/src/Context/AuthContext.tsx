// - - - -  TODO - - - -
/* 
    MAKE AN AUTH CONTEXT FOR PROPER TOKEN REFRESH

    - have modal alert happen right before the token is going to expire, 
    if the user clicks within the time frame refresh the token 

    - refreshed token lasts longer, will need another function so that if
     the user does not login in the longer timeframe the token still is
    removed.

    - context needs to have a function start when the user logs in

*/

import {
  MouseEventHandler,
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
import { useMutation } from "@apollo/client";

import { REFRESH_TOKEN } from "../utils/mutations";

const AuthContext = createContext<AuthService | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const Auth = new AuthService();

  const [viewModal, setViewModal] = useState(false);

  const openModal = () => setViewModal(true);
  const closeModal = () => setViewModal(false);

  // const [refreshToken, { error }] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    const timeout = 5 * 1000;

    console.log(Auth.getProfile());

    if (Auth?.loggedIn()) {
      setTimeout(() => {
        openModal();
      }, timeout);
    }
  }, [Auth.loggedIn()]);

  return (
    <AuthContext.Provider value={Auth}>
      <AlertDialog open={viewModal} onOpenChange={setViewModal}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
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
              onClick={() => {
                closeModal();
                // refreshToken()
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
