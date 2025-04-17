import { Counter } from "@repo/ui/components/counter";

function App() {
  return (
    <div className="p-1 bg-test-pink">
      <Counter counter={1} className="border-5 border-black bg-test-red" />
    </div>
  );
}

export default App;
