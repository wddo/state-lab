import { counterAtom, incrementAtom, resetAtom } from "@repo/store/jotai";
import { Counter } from "@repo/ui/components/counter";
import { useAtom } from "jotai";

function App() {
  const [count] = useAtom(counterAtom);
  const [, increment] = useAtom(incrementAtom);
  const [, reset] = useAtom(resetAtom);

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
