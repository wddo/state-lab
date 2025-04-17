import { useCounterStore } from "@repo/store/zustand";
import { Counter } from "@repo/ui/components/counter";

function App() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);

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
