export const TODO_URI =
  process.env.NODE_ENV === "production"
    ? "https://state-lab-api.vercel.app/api/todo"
    : "http://localhost:5001/todos";

export const TODO_QUERY_KEY = "todo";
