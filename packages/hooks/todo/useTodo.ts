import { fetchJSON, TodoData } from "@repo/api/todo";
import { useState } from "react";

export const useTodo = () => {
  const [todo, setTodo] = useState<TodoData[]>([]);

  const fetchData = async () => {
    const data = await fetchJSON();

    setTodo(data);
  };

  return {
    todo,
    fetchData,
  };
};
