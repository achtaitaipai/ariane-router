import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addActions,
  deleteAction,
  hasAction,
  playAction,
  resetActions,
} from "../src/actions";

describe("actions", () => {
  afterEach(() => {
    resetActions();
  });

  it("returns true if the action exists", () => {
    const action1 = vi.fn(() => {});

    addActions({ test: action1 });

    expect(hasAction("test")).toBeTruthy();
    expect(hasAction("nop")).toBeFalsy();
  });

  it("call the action", () => {
    const action1 = vi.fn(() => {});
    const action2 = vi.fn(() => {});

    addActions({ test: action1 });
    playAction("test");

    expect(action1).toHaveBeenCalled();
  });

  it("removes the action", () => {
    const action1 = vi.fn(() => {});
    const action2 = vi.fn(() => {});

    addActions({ test: action1 });
    deleteAction("test");

    expect(action1).not.toHaveBeenCalled();
  });

  it("throws an error if we call an action who does not exists", () => {
    expect(() => playAction("test")).toThrowError("does not exists");
  });

  it("removes the action", () => {
    addActions({ test: () => {} });
    addActions({ othertest: () => {} });

    resetActions();

    expect(hasAction("test")).toBeFalsy();
    expect(hasAction("othertest")).toBeFalsy();
  });
});
