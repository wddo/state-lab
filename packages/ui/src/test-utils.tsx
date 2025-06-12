import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

export function withQueryClient(children: React.ReactNode) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
