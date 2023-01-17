import { describe, it, expect, vi, beforeEach } from "vitest";
import { start } from "../src/start";
import * as nav from "../src/navigateTo";
import * as getHtml from "../src/getHtmlFromPage";
import createFetchMock from "vitest-fetch-mock";

describe.only("start", () => {
  const fetchMock = createFetchMock(vi);
  fetchMock.enableMocks();
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement("div");
    document.body.appendChild(testElement);
    const links = ['<a href="/some/path" ariane-router id="#test">Link 1</a>'];
    testElement.innerHTML = links.join("");
  });

  it("navigates to the link's href when clicked", async () => {
    const spy = vi.spyOn(nav, "navigateTo");
    const link = document.querySelector("a");

    start();
    const e = new MouseEvent("click");
    link?.dispatchEvent(e);

    expect(spy).toHaveBeenCalledWith(link?.href, {});
  });

  it("prevents the default action", () => {
    const link = document.querySelector("a");

    start();
    const e = new MouseEvent("click", { bubbles: true });
    const spy = vi.spyOn(e, "preventDefault");
    link?.dispatchEvent(e);

    expect(spy).toHaveBeenCalled();
  });

  it("fetch the html", () => {
    const spy = vi.spyOn(getHtml, "getHtmlFromPage");
    const link = document.querySelector("a");

    start();
    const e = new MouseEvent("mouseenter", { bubbles: true });
    link?.dispatchEvent(e);

    expect(spy).toHaveBeenCalled();
  });
});
