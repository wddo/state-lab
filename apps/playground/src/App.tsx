import { countAtom, incrementAtom, resetAtom } from "@repo/store/jotai";
import { Counter } from "@repo/ui/components/counter";
import { useAtomValue, useSetAtom } from "jotai";

function App() {
  const count = useAtomValue(countAtom);
  const increment = useSetAtom(incrementAtom);
  const reset = useSetAtom(resetAtom);

  return (
    <div className="p-1 bg-test-pink">
      <Counter
        counter={count}
        onIncrement={increment}
        onReset={reset}
        className="border-5 border-black bg-test-red"
      />
    </div>
  );
}

export default App;
