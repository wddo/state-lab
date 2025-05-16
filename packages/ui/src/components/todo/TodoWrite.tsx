import { KeyboardEvent, useRef, useState } from "react";

interface TodoWriteProps {
  onCreate?: (title: string) => void;
}

export function TodoWrite({ onCreate }: TodoWriteProps) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!title.trim().length) return;
    onCreate?.(title);
    setTitle("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white p-2">
      <p className="flex flex-1 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요"
          className="h-full w-full p-2 text-black"
          ref={inputRef}
        />
      </p>
      {Boolean(title.length) && (
        <button
          type="button"
          className="flex size-8 items-center justify-center bg-green-500 p-1 text-white"
          onClick={handleSubmit}
        >
          ✔
        </button>
      )}
    </div>
  );
}
