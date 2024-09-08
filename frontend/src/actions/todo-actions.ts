"use server";

import axiosInstance from "@/utils/axiosInstance";
import type { Todo, TodoExtended } from "@shared/types";
import { AxiosError } from "axios";

export async function getTodos(): Promise<TodoExtended[]> {
  try {
    const response = await axiosInstance.get(`/todos`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching todos:", error.response?.data);
    }
    return [];
  }
}

export async function createTodo(todo: Omit<Todo, "_id">): Promise<Todo | null> {
  try {
    const response = await axiosInstance.post(`/todos`, todo);
    return response.data;
  } catch (error) {
    console.error("Failed to create todo:", error);
    return null;
  }
}

export async function getTodo(id: string): Promise<TodoExtended | null> {
  try {
    const response = await axiosInstance.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
}

export async function deleteTodo(id: string): Promise<Todo | null> {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return null;
  }
}

export async function editTodo(
  id: string,
  updatedTodo: { title: string; description: string; completed: boolean }
): Promise<Todo | null> {
  try {
    const response = await axiosInstance.patch(`/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
}
