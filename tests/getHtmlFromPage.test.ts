import { describe, it, beforeEach, expect, vi } from "vitest";
import { getHtmlFromPage } from "../src/getHtmlFromPage";
import createFetchMock from "vitest-fetch-mock";

describe("getHtmlFromPage", () => {
  const fetchMock = createFetchMock(vi);
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("returns the correct body response when called with a valid URL", async () => {
    fetchMock.mockOnce(() => "some response body");

    const response = await getHtmlFromPage("https://example.com/path1");

    expect(response).toBe("some response body");
  });

  it("returns the cached response when called with the same URL multiple times", async () => {
    fetchMock.mockOnce(() => "another response body");

    const response = await getHtmlFromPage("https://example.com/path1");

    expect(response).toBe("some response body");
  });

  it("throws an error when called with an invalid URL", async () => {
    fetchMock.mockOnce(() => ({
      status: 404,
      body: "Not Found",
    }));

    await expect(getHtmlFromPage("not a valid url")).rejects.toThrow("404");
  });

  it("throws a network error when there is a problem with the connection", async () => {
    fetchMock.mockOnce(() => {
      throw new TypeError("Failed to fetch");
    });

    await expect(getHtmlFromPage("truc")).rejects.toThrow("Failed to fetch");
  });
});
