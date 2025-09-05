import {
  errorResponse,
  findTodoIndexById,
  jsonResponse,
  redis,
} from "../../utils/index.js";
import { TodoData } from "@repo/api/todo/todoAPI";

const TODO_QUERY_KEY = "todos";

export async function OPTIONS() {
  return jsonResponse(null, 204);
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as { title: string; id: string };
    const { title, id } = body;

    if (!id || !title) {
      return errorResponse("The request is invalid.", 400);
    }

    const todos = (await redis.lrange(TODO_QUERY_KEY, 0, -1)) as TodoData[];
    const todoIndex = findTodoIndexById(todos, id);

    if (todoIndex === -1) {
      return errorResponse("Todo not found", 404);
    }

    const updatedTodo = {
      ...todos[todoIndex],
      title,
      updatedAt: new Date().toISOString(),
    };

    await redis.lset(TODO_QUERY_KEY, todoIndex, JSON.stringify(updatedTodo));

    return jsonResponse(updatedTodo);
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json()) as { id: string };
    const { id } = body;

    if (!id) {
      return errorResponse("The request is invalid.", 400);
    }

    const allTodos = (await redis.lrange(TODO_QUERY_KEY, 0, -1)) as TodoData[];
    const deleteIndex = findTodoIndexById(allTodos, id);

    if (deleteIndex === -1) {
      return errorResponse("Todo not found", 404);
    }

    await redis.lrem(TODO_QUERY_KEY, 1, allTodos[deleteIndex]);

    return jsonResponse(null, 204);
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}
