import morphdom from "morphdom";

export const loadPage = async (html: string) => {
  const parser = new DOMParser();
  const page = parser.parseFromString(html, "text/html");
  document.title = page.title;
  morphdom(document.body, page.body);
};
