import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export function withQueryClient(children: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 재시도 방지
        gcTime: 0, // 캐시 즉시 정리
        staleTime: 0, // 즉시 stale로 만들어서 refetch 유도
      },
      mutations: {
        retry: false, // 재시도 방지
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
