export const TODO_URI =
  process.env.NODE_ENV === "production"
    ? "https://state-lab-server.vercel.app/todos"
    : "http://localhost:5001/todos";

export const TODO_QUERY_KEY = "todo";
