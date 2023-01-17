const cache = new Map<string, Promise<string>>();

export const getHtmlFromPage = async (url: string) => {
  try {
    const htmlInCache = cache.get(url);
    if (htmlInCache) return await htmlInCache;
    const html = fetchHtml(url);
    cache.set(url, html);
    return await html;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new TypeError(
        `Network error fetching HTML from ${url}: ${error.message}`
      );
    } else throw error;
  }
};

const fetchHtml = async (url: string): Promise<string> => {
  try {
    const page = await fetch(url);
    if (page.status !== 200) {
      throw new Error(
        `Error fetching HTML from ${url}: status code ${page.status}`
      );
    }
    const html = await page.text();
    return html;
  } catch (error) {
    throw error;
  }
};
