"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import axios, { AxiosError } from "axios";
import type { TodoExtended, UserExtended } from "../../../shared/dist/types";

axios.defaults.withCredentials = true;

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/users"
    : "/api/users";
interface AuthContextType {
  state: AuthContextState;
  login: (username: string, password: string) => void;
  logout: () => void;
  signup: (email: string, username: string, password: string) => void;
  getUserTodos: (
    id: string,
    setUserTodos: React.Dispatch<React.SetStateAction<TodoExtended[] | null>>
  ) => void;
}

interface AuthContextState {
  user: UserExtended | null;
  loading: boolean;
}

type ReducerAction =
  | { type: "LOGIN"; payload: UserExtended }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<UserExtended> }
  | { type: "SET_LOADING" }
  | { type: "STOP_LOADING" };

const initialState: AuthContextState = {
  user: null,
  loading: true,
};

// Define action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_USER = "UPDATE_USER";
const SET_LOADING = "SET_LOADING";
const STOP_LOADING = "STOP_LOADING";

// Reducer function
const reducer = (
  state: AuthContextState,
  action: ReducerAction
): AuthContextState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        //@ts-expect-error its setting evertyhing to be optiona
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: SET_LOADING });
        const response = await axios.get<UserExtended>(`${API_URL}/me`);
        if (response.data) {
          dispatch({ type: LOGIN, payload: response.data });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        dispatch({ type: LOGOUT });
      } finally {
        dispatch({ type: STOP_LOADING });
      }
    };

    fetchUser();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res && res.data) {
        dispatch({ type: LOGIN, payload: res.data });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.error);
      }
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  }, []);
  const signup = useCallback(
    async (email: string, username: string, password: string) => {
      try {
        dispatch({ type: SET_LOADING });
        const res = await axios.post(`${API_URL}/register`, {
          email,
          username,
          password,
        });
        if (res && res.data) {
          dispatch({ type: LOGIN, payload: res.data.user });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.error);
        }
      } finally {
        dispatch({ type: STOP_LOADING });
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      dispatch({ type: SET_LOADING });
      await axios.post(`${API_URL}/logout`);
      dispatch({ type: LOGOUT });
    } catch (error) {
      // Handle error if needed
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  }, []);

  const getUserTodos = useCallback(
    async (
      id: string,
      setUserTodos: React.Dispatch<React.SetStateAction<TodoExtended[] | null>>
    ) => {
      try {
        const response = await axios.get(`${API_URL}/${id}/todos`);
        setUserTodos(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      state,
      login,
      logout,
      signup,
      getUserTodos,
    }),
    [state, login, logout, signup, getUserTodos]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
