import {
  createTodoApi,
  deleteTodoByIdApi,
  fetchTodoApi,
  TodoData,
  updateTodoByIdApi,
} from "@repo/api/todo";
import { atom } from "jotai";

export const todoAtom = atom<TodoData[]>([]);

export const fetchTodoAtom = atom(null, async (_, set) => {
  const data = await fetchTodoApi();
  set(todoAtom, data);
});

type TodoAction =
  | { type: "create"; title: string }
  | { type: "delete"; id: string }
  | { type: "update"; id: string; title: string };

export const todoActionAtom = atom(null, async (_, set, action: TodoAction) => {
  switch (action.type) {
    case "create":
      await createTodoApi(action.title);
      break;
    case "delete":
      await deleteTodoByIdApi(action.id);
      break;
    case "update":
      await updateTodoByIdApi(action.id, action.title);
      break;
  }

  await set(fetchTodoAtom);
});
