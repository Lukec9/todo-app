"use client";

import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import type { TodoExtended, UserExtended } from "@shared/types";
import {
  fetchUser,
  login as loginUser,
  signup as signupUser,
  logout as logoutUser,
  getUserTodos,
} from "@/actions/auth-actions";

type AuthState = {
  user: UserExtended | null;
  loading: boolean;
};

// Define the actions and their payloads
type AuthAction =
  | { type: "LOGIN"; payload: UserExtended }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING" }
  | { type: "STOP_LOADING" };

// Define the context type
type AuthContextType = {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserTodos: (id: string) => Promise<TodoExtended[]>;
  user: UserExtended | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  loading: false,
};

// Create the provider component
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeUser = async () => {
      dispatch({ type: "SET_LOADING" });
      const user = await fetchUser();
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "STOP_LOADING" });
    };

    initializeUser();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const user = await loginUser(username, password);
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  }, []);

  const signup = useCallback(
    async (email: string, username: string, password: string) => {
      try {
        dispatch({ type: "SET_LOADING" });
        const user = await signupUser(email, username, password);
        if (user) {
          dispatch({ type: "LOGIN", payload: user });
        }
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        dispatch({ type: "STOP_LOADING" });
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      await logoutUser();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  }, []);

  const getUserTodos = useCallback(async (id: string) => {
    try {
      return await getUserTodos(id);
    } catch (error) {
      console.error("Error fetching user todos:", error);
      return [];
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      login,
      signup,
      logout,
      getUserTodos,
      user: state.user,
    }),
    [state, login, signup, logout, getUserTodos]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
