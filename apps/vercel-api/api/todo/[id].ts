import { errorResponse, extractId, jsonResponse, redis } from "../../utils/index.js";

const TODO_QUERY_KEY = "todos";

export async function PUT(req: Request) {
  try {
    const id = extractId(req);
    if (!id) {
      return errorResponse("Todo ID is required", 400);
    }

    const body = (await req.json()) as { title: string };
    const { title } = body;

    if (!title) {
      return errorResponse("Title is required", 400);
    }

    const todos = await redis.lrange(TODO_QUERY_KEY, 0, -1);
    const todoIndex = todos.findIndex((todo: string) => {
      const parsed = JSON.parse(todo);
      return parsed.id === id;
    });

    if (todoIndex === -1) {
      return errorResponse("Todo not found", 404);
    }

    const updatedTodo = {
      ...JSON.parse(todos[todoIndex]),
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
    const id = extractId(req);
    if (!id) {
      return errorResponse("Todo ID is required", 400);
    }

    const allTodos = await redis.lrange(TODO_QUERY_KEY, 0, -1);
    const deleteIndex = allTodos.findIndex((todo: string) => {
      const parsed = JSON.parse(todo);
      return parsed.id === id;
    });

    if (deleteIndex === -1) {
      return errorResponse("Todo not found", 404);
    }

    await redis.lrem(TODO_QUERY_KEY, 1, allTodos[deleteIndex]);
    return jsonResponse("Todo deleted successfully");
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}
