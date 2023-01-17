import { playAction } from "./actions";
import { getHtmlFromPage } from "./getHtmlFromPage";
import { toErrorWithMessage } from "./error";
import { loadPage } from "./loadPage";
import { Options } from "./options";
import { start } from "./start";

const playBefore = async (url: string, beforeKey?: string) => {
  if (beforeKey) {
    const [html] = await Promise.all([
      getHtmlFromPage(url),
      playAction(beforeKey),
    ]);
    return html;
  }
  return getHtmlFromPage(url);
};

export const navigateTo = async (url: string, options?: Options) => {
  const { before, between, after } = options ?? {};
  try {
    const html = await playBefore(url, before);
    if (between) playAction(between);
    loadPage(html);
    history.pushState({}, document.title, url);
    scrollTo(0, 0);
    if (after) playAction(after);
    start();
  } catch (error) {
    const { message } = toErrorWithMessage(error);
    console.error(message);
    window.location.href = url;
    // throw new Error(`Error navigating to ${url}: ${message}`);
  }
};
