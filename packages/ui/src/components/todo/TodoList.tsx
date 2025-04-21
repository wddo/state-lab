import { TodoData } from "@repo/api/todo";
import { useTodo } from "@repo/hooks/todo";
import { TodoItem } from "@repo/ui/components/todo";
import { PropsWithChildren, useEffect } from "react";

interface TodoListProps {}

export function TodoList({ children }: PropsWithChildren<TodoListProps>) {
  const { fetchData, todo } = useTodo();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      {todo.map(({ id, ...rest }) => {
        return <TodoItem key={id} {...(rest as TodoData)} />;
      })}
    </div>
  );
}
