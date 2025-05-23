import { fetchTodoApi, TodoData } from "@repo/api/todo";
import { fetchTodoAtom, todoActionAtom, todoAtom } from "@repo/store/todo";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

export const useTodoQuery = () => {
  return useQuery<TodoData[]>({
    queryKey: ["todo"],
    queryFn: fetchTodoApi,
    staleTime: 1000 * 10,
  });
};

export const useTodo = () => {
  const todo = useAtomValue(todoAtom);
  const fetchTodo = useSetAtom(fetchTodoAtom);
  const dispatch = useSetAtom(todoActionAtom);

  return {
    todo,
    fetchTodo,
    createTodo: (title: string) => dispatch({ type: "create", title }),
    deleteTodo: (id: string) => dispatch({ type: "delete", id }),
    updateTodo: (id: string, title: string) =>
      dispatch({ type: "update", id, title }),
  };
};
