import { TodoData } from "@repo/api/todo";
import { ChangeEvent, useRef, useState } from "react";

interface TodoItemProps extends TodoData {
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, title: string) => void;
}

export function TodoItem(props: TodoItemProps) {
  const { onDelete, onUpdate, title, id } = props;
  const [value, setValue] = useState(title);
  const [isWrite, setIsWrite] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setIsWrite(true);
  };

  const handleInputBlur = () => {
    commit();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDeleteClick = () => {
    onDelete?.(props.id);
  };

  const commit = () => {
    if (value === title) {
      setIsWrite(false);
      return;
    }

    onUpdate?.(id, value);
    setIsWrite(false);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white p-2">
      <p className="flex flex-1 items-center">
        <input
          type="text"
          value={value}
          className="h-full w-full p-2 text-black read-only:focus:outline-none"
          readOnly={!isWrite}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
      </p>
      {isWrite ? (
        <span className="flex size-8 items-center justify-center p-1 text-white">
          💬
        </span>
      ) : (
        <button
          type="button"
          className="flex size-8 shrink-0 items-center justify-center p-1"
          onClick={handleDeleteClick}
          aria-label="삭제"
        >
          ❌
        </button>
      )}
    </div>
  );
}
