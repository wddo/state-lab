import { useTodo } from "@repo/hooks/todo";
import { TodoItem } from "@repo/ui/components/todo";
import { TodoWrite } from "@repo/ui/components/todo/TodoWrite";
import { PropsWithChildren, useEffect } from "react";

interface TodoListProps {}

export function TodoList({ children }: PropsWithChildren<TodoListProps>) {
  const { fetchTodo, todo, deleteTodo, createTodo, updateTodo } = useTodo();

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleCreate = (title: string) => {
    createTodo(title);
  };

  const handleUpdate = (id: string, title: string) => {
    updateTodo(id, title);
  };

  return (
    <div className="space-y-2">
      {todo.map((props) => {
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
    </div>
  );
}
