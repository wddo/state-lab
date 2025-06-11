import {
  createTodoApi,
  deleteTodoByIdApi,
  fetchTodoApi,
  TodoData,
  updateTodoByIdApi,
} from "@repo/api/todo";
import { TODO_QUERY_KEY } from "@repo/data/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useTodo = () => {
  const queryClient = useQueryClient();

  const {
    data: todo,
    isLoading,
    isError,
    isStale,
    isFetching,
    refetch,
  } = useQuery<TodoData[]>({
    queryKey: [TODO_QUERY_KEY],
    queryFn: async () => {
      if (process.env.NODE_ENV === "development") await sleep(1000); // 개발 테스트용
      return await fetchTodoApi();
    },
    staleTime: 1000 * 10,
  });

  const create = useMutation({
    mutationFn: (title: string) => createTodoApi(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTodoByIdApi(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteTodoByIdApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });

  return {
    todo,
    createTodo: create.mutate,
    deleteTodo: remove.mutate,
    updateTodo: update.mutate,
    isLoading,
    isError,
    isStale,
    isFetching,
    refetch,
  };
};
