import { errorResponse, jsonResponse, redis } from "../utils/index.js";

const TODO_QUERY_KEY = "todos";

export async function GET() {
  try {
    const todos = await redis.lrange(TODO_QUERY_KEY, 0, -1);

    return jsonResponse([...todos]);
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { title: string };
    const { title } = body;

    if (!title) {
      return errorResponse("Title is required", 400);
    }

    const newTodo = {
      id: crypto.randomUUID(),
      title,
      createdAt: new Date().toISOString(),
    };

    await redis.lpush(TODO_QUERY_KEY, JSON.stringify(newTodo));
    return jsonResponse(newTodo, 201);
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}
