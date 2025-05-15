import {
  createTodoApi,
  deleteTodoByIdApi,
  fetchTodoApi,
  TodoData,
  updateTodoByIdApi,
} from "@repo/api/todo";
import { useState } from "react";

export const useTodo = () => {
  const [todo, setTodo] = useState<TodoData[]>([]);

  const fetchTodo = async () => {
    const data = await fetchTodoApi();

    setTodo(data);
  };

  const createTodo = async (title: string) => {
    await createTodoApi(title);
    await fetchTodo();
  };

  const deleteTodo = async (id: string) => {
    await deleteTodoByIdApi(id);
    await fetchTodo();
  };

  const updateTodo = async (id: string, title: string) => {
    await updateTodoByIdApi(id, title);
    await fetchTodo();
  };

  return {
    todo,
    fetchTodo,
    createTodo,
    deleteTodo,
    updateTodo,
  };
};
