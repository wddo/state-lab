import { afterEach, expect, test, vi } from "vitest";

import { withQueryClient } from "@repo/ui/test-utils";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { TodoList } from "./todo/TodoList";

const fetchSpy = vi.spyOn(global, "fetch");

afterEach(() => {
  cleanup();
});

test("TodoList가 정상적으로 렌더링되어야 합니다", async () => {
  fetchSpy.mockResolvedValueOnce({
    json: () =>
      Promise.resolve([
        { id: "1", title: "기존 할 일 1" },
        { id: "2", title: "기존 할 일 2" },
      ]),
  } as Response);

  render(withQueryClient(<TodoList />));

  await waitFor(() => {
    expect(screen.getByDisplayValue("기존 할 일 1")).toBeTruthy();
    expect(screen.getByDisplayValue("기존 할 일 2")).toBeTruthy();
  });
});

test("TodoList에 새로운 할 일을 추가할 수 있어야 합니다", async () => {
  fetchSpy.mockResolvedValueOnce({
    json: () =>
      Promise.resolve([
        { id: "1", title: "기존 할 일 1" },
        { id: "2", title: "기존 할 일 2" },
      ]),
  } as Response);

  render(withQueryClient(<TodoList />));
  const user = userEvent.setup();

  const input = screen.getByPlaceholderText("할 일을 입력하세요");
  await user.type(input, "새로운 할 일");

  const addButton = await screen.findByRole("button", { name: "추가" });

  fetchSpy.mockResolvedValueOnce({
    json: () =>
      Promise.resolve([
        { id: "1", title: "기존 할 일 1" },
        { id: "2", title: "기존 할 일 2" },
        { id: "3", title: "새로운 할 일" },
      ]),
  } as Response);

  await user.click(addButton);

  await waitFor(() => {
    expect(screen.getByDisplayValue("새로운 할 일")).toBeTruthy();
  });

  console.log(screen.logTestingPlaygroundURL());
});
