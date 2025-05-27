import { useCounterStore } from "@repo/store";

export const useCounter = () => {
  const name = useCounterStore((state) => state.name);
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);

  return {
    name,
    count,
    increment,
    reset,
  };
};
