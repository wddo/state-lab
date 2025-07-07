import { Redis } from "@upstash/redis";

// Redis 인스턴스
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
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
  const response = typeof data === "string" ? { message: data } : data;
  return new Response(JSON.stringify(response), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ID 추출 헬퍼 함수
export function extractId(req: Request): string | null {
  return req.url.split("/").pop() || null;
}
