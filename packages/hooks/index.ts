export * from "./todo";
export { useCounter as useCounterJotai } from "./useCounter.jotai";
export { useCounter as useCounterZustand } from "./useCounter.zustand";

import { useSearchParams } from "react-router-dom";

export function useStateType(): "jotai" | "zustand" {
  const [params] = useSearchParams();
  const state = params.get("state");

  if (state === "jotai" || state === "zustand") return state;

  return "zustand"; // fallback
}
