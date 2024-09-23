"use client";
const api =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";
// : process.env.NEXT_PUBLIC_API_URL;

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
  logout as logoutUser,
  getUserTodos as getUsersTodos,
} from "@/actions/auth-actions";
import { getCsrfToken } from "@/utils/getCsrfToken";
import toast from "react-hot-toast";

type AuthState = {
  user: UserExtended | null;
  loading: boolean;
};

type AuthAction =
  | { type: "LOGIN"; payload: UserExtended }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING" }
  | { type: "STOP_LOADING" };

type AuthContextType = {
  state: AuthState;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
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
    getCsrfToken();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      dispatch({ type: "SET_LOADING" });

      const response = await fetch(`${api}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      dispatch({ type: "LOGIN", payload: data.user });
      toast.success("Login successful");
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Login error: " + error.message);
        return { success: false, error: error.message };
      }

      return { success: false };
    } finally {
      dispatch({ type: "STOP_LOADING" });
      await getCsrfToken();
    }
  }, []);

  const signup = useCallback(
    async (email: string, username: string, password: string) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await fetch(`${api}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const data = await response.json();
        if (data) {
          dispatch({ type: "LOGIN", payload: data.user });
          toast.success("Signup successful");
        }
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Signup error: " + error.message);
          return { success: false, error: error.message };
        }

        return { success: false };
      } finally {
        dispatch({ type: "STOP_LOADING" });
        getCsrfToken();
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await logoutUser();
      if (res.error) {
        toast.error(res.error);
      } else if (res.data) {
        toast.success("Logged out successfully");
      }

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Logout error: " + error.message);
      }
    }
  }, []);

  const getUserTodos = useCallback(async (id: string) => {
    try {
      return await getUsersTodos(id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error fetching user todos: " + error.message);
      }

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
