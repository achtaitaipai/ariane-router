import { describe, it, expect, beforeEach } from "vitest";
import { getOptions, defineConfig } from "../src/options";

describe("options", () => {
  const link1 = document.createElement("a");
  const link2 = document.createElement("a");
  link2.setAttribute("ariane-before", "before");
  link2.setAttribute("ariane-between", "between");
  link2.setAttribute("ariane-after", "after");

  beforeEach(() => {
    defineConfig({});
  });

  it("gets the options defined in the defineConfig", () => {
    const userOptions = {
      before: "userBefore",
      between: "userBetween",
      after: "userBefore",
    };
    defineConfig(userOptions);
    const options1 = getOptions(link1);

    expect(JSON.stringify(options1)).toBe(JSON.stringify(userOptions));
  });

  it("gets the options defined in the attributes", () => {
    const options1 = getOptions(link1);
    const options2 = getOptions(link2);

    expect(JSON.stringify(options1)).toBe(JSON.stringify({}));
    expect(JSON.stringify(options2)).toBe(
      JSON.stringify({
        before: "before",
        between: "between",
        after: "after",
      })
    );
  });
});
