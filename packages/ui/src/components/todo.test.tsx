import { afterEach, expect, test, vi } from "vitest";

import { cleanup, render, screen, waitFor } from "@testing-library/react";

import * as todoApi from "@repo/api/todo";
import { withQueryClient } from "@repo/ui/test-utils";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./todo/TodoList";

const mockFetch = vi.spyOn(todoApi, "fetchTodoApi");
const mockCreate = vi.spyOn(todoApi, "createTodoApi");
const mockUpdate = vi.spyOn(todoApi, "updateTodoByIdApi");
const mockDelete = vi.spyOn(todoApi, "deleteTodoByIdApi");

afterEach(() => {
  cleanup();
});

test("TodoList가 정상적으로 렌더링되어야 합니다", async () => {
  mockFetch.mockResolvedValueOnce([
    { id: "1", title: "할 일 1" },
    { id: "2", title: "할 일 2" },
  ]);

  render(withQueryClient(<TodoList />));

  await waitFor(() => {
    expect(screen.getByDisplayValue("할 일 1")).toBeTruthy();
    expect(screen.getByDisplayValue("할 일 2")).toBeTruthy();
  });
});

test("TodoList에 새로운 할 일을 추가할 수 있어야 합니다", async () => {
  mockFetch.mockResolvedValueOnce([
    { id: "1", title: "기존 할 일 1" },
    { id: "2", title: "기존 할 일 2" },
  ]);

  render(withQueryClient(<TodoList />));
  const user = userEvent.setup();

  const input = await screen.findByPlaceholderText("할 일을 입력하세요");
  await user.type(input, "새로운 할 일");

  // react-query 의 invalidateQueries 에 의해 refetch 발생시키기 위함
  mockCreate.mockResolvedValueOnce(undefined);

  mockFetch.mockResolvedValueOnce([
    { id: "1", title: "기존 할 일 1" },
    { id: "2", title: "기존 할 일 2" },
    { id: "3", title: "새로운 할 일" },
  ]);

  const addButton = await screen.findByRole("button", { name: "추가" });
  await user.click(addButton);

  await waitFor(() => {
    expect(screen.getByDisplayValue("새로운 할 일")).toBeTruthy();
  });
});
