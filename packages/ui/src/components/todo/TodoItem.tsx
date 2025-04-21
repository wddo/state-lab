interface TodoData {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
}

export function TodoItem(props: TodoData) {
  return (
    <div className="flex rounded-lg bg-white p-1">
      <p className="ml-1 flex flex-1 items-center text-gray-800">
        {props.name}
      </p>
      <button type="button" className="shrink-0 p-1">
        ❌
      </button>
    </div>
  );
}
