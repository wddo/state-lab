import { useCounterJotai, useCounterZustand, useStateType } from "@repo/hooks";
import { Counter } from "@repo/ui/components/counter";
import { TodoList } from "@repo/ui/components/todo";

function App() {
  const useCounter =
    useStateType() === "jotai" ? useCounterJotai : useCounterZustand;

  const { name, count, increment, reset } = useCounter();

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-black p-2 text-white">
        state version : {name}
      </div>
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
