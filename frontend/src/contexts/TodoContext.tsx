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
import {
  getTodos as fetchTodos,
  createTodo as postTodo,
  getTodo as fetchTodo,
  deleteTodo as removeTodo,
  editTodo as patchTodo,
} from "@/actions/todo-actions";
type TodoState = {
  todos: Todo[];
};

type TodoAction =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "CREATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo };

type TodoContextType = {
  state: TodoState;
  getTodos: () => void;
  createTodo: (todo: Omit<Todo, "_id">) => void;
  getTodo: (id: string) => Promise<TodoExtended | null>;
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

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = useCallback(async () => {
    try {
      const todos = await fetchTodos();
      dispatch({ type: "SET_TODOS", payload: todos });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  const createTodo = useCallback(async (todo: Omit<Todo, "_id">) => {
    try {
      const newTodo = await postTodo(todo);
      if (newTodo) {
        dispatch({ type: "CREATE_TODO", payload: newTodo });
      }
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  }, []);

  const getTodo = useCallback(async (id: string) => {
    try {
      return await fetchTodo(id);
    } catch (error) {
      console.error("Error fetching todo:", error);
      return null;
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      const deletedTodo = await removeTodo(id);
      if (deletedTodo) {
        dispatch({ type: "DELETE_TODO", payload: deletedTodo });
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
        const updated = await patchTodo(id, updatedTodo);
        if (updated) {
          dispatch({ type: "UPDATE_TODO", payload: updated });
        }
      } catch (error) {
        console.error("Error updating todo:", error);
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

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};
