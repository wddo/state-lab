import { Counter } from "@repo/ui/components/counter";
import { TodoList } from "@repo/ui/components/todo";

function App() {
  return (
    <div className="space-y-4">
      <div className="bg-test-pink p-1">
        <Counter counter={1} className="border-5 bg-test-red border-black" />
      </div>

      <div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
