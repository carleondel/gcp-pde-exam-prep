import { createContext, useContext } from "react";

export const TRIAL_QUESTION_COUNT = 20;

/** "local": no backend configured. "cloud": signed in. "trial": guest. */
export const LOCAL_AUTH = Object.freeze({ mode: "local", user: null, trial: false });

export const AuthContext = createContext(LOCAL_AUTH);

export function useAuth() {
  return useContext(AuthContext);
}
