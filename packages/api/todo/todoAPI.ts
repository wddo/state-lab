import { TODO_URI } from "@repo/data/constants";

export interface TodoData {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
}

export const fetchJSON = async () => await (await fetch(TODO_URI)).json();
