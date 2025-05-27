import { useTodo } from "@repo/hooks/todo";
import { TodoItem } from "@repo/ui/components/todo";
import { TodoWrite } from "@repo/ui/components/todo/TodoWrite";
import { PropsWithChildren } from "react";

interface TodoListProps {}

export function TodoList({ children }: PropsWithChildren<TodoListProps>) {
  const {
    todo,
    isStale,
    isLoading,
    isError,
    createTodo,
    updateTodo,
    deleteTodo,
    refetch,
    isFetching,
  } = useTodo();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleCreate = (title: string) => {
    createTodo(title);
  };

  const handleUpdate = (id: string, title: string) => {
    updateTodo({ id, title });
  };

  return (
    <div className="space-y-2">
      {todo?.map((props) => {
        return (
          <TodoItem
            key={props.id}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            {...props}
          />
        );
      })}
      <TodoWrite onCreate={handleCreate} />
      {isStale && (
        <button
          className="text-md flex items-center"
          onClick={() => refetch()}
          title="데이터 새로고침"
        >
          {!isFetching ? `🔄 새로고침` : `...`}
        </button>
      )}
    </div>
  );
}
