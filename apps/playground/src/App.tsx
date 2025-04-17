import { counterAtom, incrementAtom, resetAtom } from "@repo/store/jotai";
import { Counter } from "@repo/ui/components/counter";
import { TodoList } from "@repo/ui/components/todo";
import { useAtom } from "jotai";

function App() {
  const [count] = useAtom(counterAtom);
  const [, increment] = useAtom(incrementAtom);
  const [, reset] = useAtom(resetAtom);

  return (
    <div className="space-y-4">
      <div className="bg-test-pink p-1">
        <Counter
          counter={count}
          onIncrement={increment}
          onReset={reset}
          className="border-5 bg-test-red border-black"
        />
      </div>

      <div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
