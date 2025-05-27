import { countAtom, incrementAtom, nameAtom, resetAtom } from "@repo/store";
import { useAtomValue, useSetAtom } from "jotai";

export const useCounter = () => {
  const name = useAtomValue(nameAtom);
  const count = useAtomValue(countAtom);
  const increment = useSetAtom(incrementAtom);
  const reset = useSetAtom(resetAtom);

  return {
    name,
    count,
    increment,
    reset,
  };
};
