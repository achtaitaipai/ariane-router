import { beforeEach, describe, expect, it, vi } from "vitest";
import * as loadPage from "../src/loadPage";
import * as getHtml from "../src/getHtmlFromPage";
import * as start from "../src/start";
import { navigateTo } from "../src/navigateTo";
import createFetchMock from "vitest-fetch-mock";

describe.only("navigateTo", () => {
  const fetchMock = createFetchMock(vi);
  fetchMock.enableMocks();

  const title = "title";
  let url = "random/path";
  const html = `
<html>
  <head>
  <title>${title}</title>
  </head>
  <body>
  </body>
</html>`;

  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockOnce(() => html);
    url += "1";
  });

  it("fetch the html", () => {
    const spy = vi.spyOn(getHtml, "getHtmlFromPage");

    navigateTo(url, {});

    expect(spy).toHaveBeenCalledWith(url);
  });

  it("load the html", async () => {
    const spy = vi.spyOn(loadPage, "loadPage");

    await navigateTo(url, {});

    expect(spy).toHaveBeenCalledWith(html);
  });

  it("pushs to the history", async () => {
    const spy = vi.spyOn(history, "pushState");

    await navigateTo(url, {});

    expect(spy).toHaveBeenCalledWith({}, title, url);
  });

  it("restarts ariane", async () => {
    const spy = vi.spyOn(start, "start");

    await navigateTo(url, {});

    expect(spy).toHaveBeenCalled();
  });

  it("uploads the url when an error occured", async () => {
    fetchMock.resetMocks();
    fetchMock.mockOnce(() => ({
      status: 404,
      body: "Not Found",
    }));

    try {
      await navigateTo(url, {});
    } catch (error) {
      expect(window.location.href).toBe(url);
    }
  });
});
