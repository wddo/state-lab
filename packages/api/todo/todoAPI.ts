import { TODO_URI } from "@repo/data/constants";

export interface TodoData {
  title: string;
  id: string;
  createdAt?: string;
}

export const fetchTodoApi = async () => {
  const response = await (await fetch(TODO_URI)).json();
  return JSON.parse(JSON.stringify(response));
};

export const createTodoApi = async (title: string) => {
  await fetch(TODO_URI, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
};

export const updateTodoByIdApi = async (id: string, title: string) => {
  await fetch(`${TODO_URI}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, id }),
  });
};

export const deleteTodoByIdApi = async (id: string) => {
  await fetch(`${TODO_URI}/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
};
