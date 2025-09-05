import { Redis } from "@upstash/redis";
import { TodoData } from "@repo/api/todo/todoAPI";

// Redis 인스턴스
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// 공통 헤더 설정
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// 에러 응답 헬퍼 함수
export function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// JSON 응답 헬퍼 함수
export function jsonResponse<T>(data: T, status: number = 200) {
  // null 이면 No Content
  const headers =
    data === null
      ? corsHeaders
      : { ...corsHeaders, "Content-Type": "application/json" };

  return new Response(data === null ? null : JSON.stringify(data), {
    status,
    headers,
  });
}

// ID로 todo의 인덱스를 찾는 헬퍼 함수
export function findTodoIndexById(todos: TodoData[], id: string): number {
  return todos.findIndex((todo: TodoData) => todo.id === id);
}
