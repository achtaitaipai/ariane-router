import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { addActions, resetActions } from "../src/actions";
import { navigateTo } from "../src/navigateTo";

describe.only("hooks", () => {
  const fetchMock = createFetchMock(vi);
  fetchMock.enableMocks();
  const beforeAction = vi.fn();
  const betweenAction = vi.fn();
  const afterAction = vi.fn();

  beforeEach(() => {
    addActions({ first: beforeAction });
    addActions({ second: betweenAction });
    addActions({ third: afterAction });
  });

  afterEach(() => {
    resetActions();
  });

  it("calls beforeAction", async () => {
    await navigateTo("random/path", { before: "first" });

    expect(beforeAction).toHaveBeenCalled();
  });

  it("calls betweenAction", async () => {
    await navigateTo("random/path", { between: "second" });

    expect(betweenAction).toHaveBeenCalled();
  });

  it("calls afterAction", async () => {
    await navigateTo("random/path", { after: "third" });

    expect(afterAction).toHaveBeenCalled();
  });
});
