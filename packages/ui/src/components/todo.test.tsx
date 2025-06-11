import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { withQueryClient } from "@repo/ui/test-utils";
import { render, screen, waitFor } from "@testing-library/react";

import { TodoList } from "./todo/TodoList";

describe("TodoList 컴포넌트", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve([
          { id: "1", title: "1 수정11" },
          { id: "2", title: "another" },
        ]),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("TodoList가 정상적으로 렌더링되어야 합니다", async () => {
    render(withQueryClient(<TodoList />));

    await waitFor(() => {
      expect(screen.getByDisplayValue("another")).toBeTruthy();
      expect(screen.getByDisplayValue("1 수정11")).toBeTruthy();
    });
  });
});
