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
import type { Todo, TodoExtended } from "@shared/types";
import axios, { AxiosError } from "axios";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/todos"
    : "/api/todos";

type TodoState = {
  todos: Todo[];
};

// Define the actions and their payloads
type TodoAction =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "CREATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo };

// Define the context type
type TodoContextType = {
  state: TodoState;
  getTodos: () => void;
  createTodo: (todo: Omit<Todo, "_id">) => void;
  getTodo: (id: string) => Promise<TodoExtended>;
  deleteTodo: (id: string) => void;
  editTodo: (
    id: string,
    updatedTodo: { title: string; description: string; completed: boolean }
  ) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "CREATE_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((t: Todo) => t._id !== action.payload._id),
      };
    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo: Todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };
    default:
      return state;
  }
};

const initialState: TodoState = {
  todos: [],
};

// Create the provider component
export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    try {
      getTodos();
    } catch (error) {
      console.error("Could not get todos");
    }
  });

  const getTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      if (response && response.data) {
        dispatch({ type: "SET_TODOS", payload: response.data });
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  const createTodo = useCallback(async (todo: Omit<Todo, "_id">) => {
    try {
      const response = await axios.post(`${API_URL}`, todo);
      if (response && response.data) {
        dispatch({ type: "CREATE_TODO", payload: response.data });
      }
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  }, []);

  const getTodo = useCallback(async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response && response.data) {
        dispatch({ type: "DELETE_TODO", payload: response.data });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }, []);

  const editTodo = useCallback(
    async (
      id: string,
      updatedTodo: { title: string; description: string; completed: boolean }
    ) => {
      try {
        const response = await axios.patch(`${API_URL}/${id}`, updatedTodo);
        if (response && response.data) {
          dispatch({ type: "UPDATE_TODO", payload: response.data });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Error updating todo:", error.response?.data);
        }
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      state,
      getTodos,
      createTodo,
      getTodo,
      deleteTodo,
      editTodo,
    }),
    [state, getTodos, createTodo, getTodo, deleteTodo, editTodo]
  );
  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

// Create a custom hook to use the context
export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};
