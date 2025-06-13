import { expect, test, vi } from "vitest";

import { render, screen, waitFor, within } from "@testing-library/react";

import * as todoApi from "@repo/api/todo";
import { withQueryClient } from "@repo/ui/test/utils";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./todo/TodoList";

const mockFetch = vi.spyOn(todoApi, "fetchTodoApi");
const mockCreate = vi.spyOn(todoApi, "createTodoApi");
const mockUpdate = vi.spyOn(todoApi, "updateTodoByIdApi");
const mockDelete = vi.spyOn(todoApi, "deleteTodoByIdApi");

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

  // invalidateQueries 의한 결과 반환
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

test("TodoList에 할 일을 수정할 수 있어야 합니다", async () => {
  mockFetch.mockResolvedValueOnce([
    { id: "1", title: "기존 할 일 1" },
    { id: "2", title: "기존 할 일 2" },
  ]);

  render(withQueryClient(<TodoList />));
  const user = userEvent.setup();

  const input = await screen.findByDisplayValue("기존 할 일 2");
  await user.click(input);
  await user.clear(input);
  await user.type(input, "수정된 할 일");

  mockUpdate.mockResolvedValueOnce(undefined);

  mockFetch.mockResolvedValueOnce([
    { id: "1", title: "기존 할 일 1" },
    { id: "2", title: "수정된 할 일" },
  ]);

  await user.tab();

  await waitFor(() => {
    expect(screen.getByDisplayValue("수정된 할 일")).toBeTruthy();
  });
});

test("TodoList에 할 일을 삭제할 수 있어야 합니다", async () => {
  mockFetch.mockResolvedValueOnce([
    { id: "1", title: "기존 할 일 1" },
    { id: "2", title: "기존 할 일 2" },
  ]);

  render(withQueryClient(<TodoList />));
  const user = userEvent.setup();

  mockDelete.mockResolvedValueOnce(undefined);

  mockFetch.mockResolvedValueOnce([{ id: "1", title: "기존 할 일 1" }]);

  const input = await screen.findByDisplayValue("기존 할 일 1");
  const group = input.closest("div");
  const deleteButton = await within(group!).findByRole("button", {
    name: "삭제",
  });
  await user.click(deleteButton);

  await waitFor(() => {
    expect(screen.getByDisplayValue("기존 할 일 1")).toBeTruthy();
    expect(screen.queryByDisplayValue("기존 할 일 2")).toBeNull();
  });
});
