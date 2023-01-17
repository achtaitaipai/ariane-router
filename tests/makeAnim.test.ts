import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { makeAnim } from "../src/makeAnim";

describe("makeAnim", () => {
  let testElement = document.createElement("div");
  document.body.appendChild(testElement);
  const fakeEvent = "fakeEvent";

  beforeEach(() => {
    const animateMock = vi.fn((..._: any[]) => {
      const listeners: Function[] = [];
      const addEventListener = (str: string, listener: Function) =>
        listeners.push(listener);
      setTimeout(() => {
        listeners.forEach((func) => func(fakeEvent));
      }, 0);
      return {
        addEventListener,
      } as unknown as Animation;
    });
    testElement.animate = animateMock;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  it("returns a promise", () => {
    const promise = makeAnim(
      "div",
      [
        { transform: "translate(0,0)" },
        { transform: "translate(100px,100px)" },
      ],
      { duration: 300 }
    )();
    expect(promise).toBeInstanceOf(Promise);
  });
  it("resolves the promise", async () => {
    const promise = await makeAnim(
      "div",
      [
        { transform: "translate(0,0)" },
        { transform: "translate(100px,100px)" },
      ],
      { duration: 300 }
    )();
    expect(promise).toBe(fakeEvent);
  });
  it("rejects the promise when the element does not exists", () => {
    const promise = makeAnim(
      "bad selector",
      [
        { transform: "translate(0,0)" },
        { transform: "translate(100px,100px)" },
      ],
      { duration: 300 }
    )();
    expect(promise).rejects.toThrow("No Element for");
  });
});
