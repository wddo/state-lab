interface CounterProps {
  counter: number;
  onIncrement?: () => void;
  onReset?: () => void;
  className?: string;
}

export function Counter({
  counter,
  onIncrement,
  onReset,
  ...rest
}: CounterProps) {
  return (
    <div {...rest}>
      <div className="p-1">Counter : {counter}</div>
      <div className="flex gap-1 p-1">
        <button onClick={onIncrement}>increment</button>
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  );
}
