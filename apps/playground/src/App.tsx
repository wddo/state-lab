import { useCounterStore } from "@repo/store/zustand";
import { Counter } from "@repo/ui/components/counter";
import { TodoList } from "@repo/ui/components/todo";

function App() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);

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
