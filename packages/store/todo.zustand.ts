import {
  createTodoApi,
  deleteTodoByIdApi,
  fetchTodoApi,
  updateTodoByIdApi,
} from "@repo/api/todo";
import { create } from "zustand";

interface TodoData {
  id: string;
  title: string;
}

interface TodoStore {
  todo: TodoData[];
  fetchTodo: () => Promise<void>;
  createTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todo: [],
  fetchTodo: async () => {
    const data = await fetchTodoApi();
    set({ todo: data });
  },
  createTodo: async (title: string) => {
    await createTodoApi(title);
    await get().fetchTodo();
  },
  deleteTodo: async (id: string) => {
    await deleteTodoByIdApi(id);
    await get().fetchTodo();
  },
  updateTodo: async (id: string, title: string) => {
    await updateTodoByIdApi(id, title);
    await get().fetchTodo();
  },
}));
