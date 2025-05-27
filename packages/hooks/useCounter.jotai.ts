import { countAtom, incrementAtom, resetAtom } from "@repo/store";
import { useAtomValue, useSetAtom } from "jotai";

export const useCounter = () => {
  const count = useAtomValue(countAtom);
  const increment = useSetAtom(incrementAtom);
  const reset = useSetAtom(resetAtom);

  return {
    count,
    increment,
    reset,
  };
};
