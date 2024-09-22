import fetchInstance from "@/utils/fetchInstance";
import type { Todo, TodoExtended } from "@shared/types";
import { revalidatePath } from "next/cache";

export async function getTodos(): Promise<TodoExtended[]> {
  try {
    const response = await fetchInstance(`/todos`, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching todos:", error.message);
    }
    return [];
  }
}

export async function createTodo(todo: Omit<Todo, "_id">): Promise<Todo | null> {
  try {
    const response = await fetchInstance(`/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
    });
    revalidatePath("/todos");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create todo:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export async function getTodo(id: string): Promise<TodoExtended | null> {
  try {
    const response = await fetchInstance(`/todos/${id}`, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
}

export async function deleteTodo(id: string): Promise<Todo | null> {
  try {
    const response = await fetchInstance(`/todos/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/todos");
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
    const response = await fetchInstance(`/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTodo),
    });
    revalidatePath("/todos");
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
}
