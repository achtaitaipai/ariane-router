import { describe, it, beforeEach, expect, afterEach } from "vitest";
import { getLinks } from "../src/start";

describe("getLinks", () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement("div");
    document.body.appendChild(testElement);
    const links = [
      "<a ariane-router>yes</a>",
      "<a>no</a>",
      '<a ariane-before="bar">yes</a>',
      '<a ariane-after="foo">yes</a>',
      '<a ariane-machin="foo">yes</a>',
      "<a ariane->yes</a>",
    ];
    testElement.innerHTML = links.join("");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns an array of HTMLAnchorElement", () => {
    const result = getLinks();

    expect(result).toBeInstanceOf(Array);

    result.forEach((res) => expect(res).toBeInstanceOf(HTMLAnchorElement));
  });

  it("returns each links with an attribute who starts with 'ariane-'", () => {
    const result = getLinks();

    result.forEach((res) => expect(res.textContent).toBe("yes"));
  });
});
