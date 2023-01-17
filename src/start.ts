import { getHtmlFromPage } from "./getHtmlFromPage";
import { navigateTo } from "./navigateTo";
import { getOptions } from "./options";

export const start = () => {
  const links = getLinks();
  links.forEach((link) => {
    link.removeEventListener("mouseenter", handleMouseOver);
    link.addEventListener("mouseenter", handleMouseOver);
    link.removeEventListener("click", handleClick);
    link.addEventListener("click", handleClick);
  });
};

const handleClick = async (e: MouseEvent) => {
  const link = getLinkFromEvent(e);
  if (!link) return;
  e.preventDefault();
  navigateTo(link.href, getOptions(link));
};

const handleMouseOver = (e: MouseEvent) => {
  const link = getLinkFromEvent(e);
  if (!link) return;
  getHtmlFromPage(link.href);
};

export const getLinks = () =>
  Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).filter((a) =>
    Array.from(a.attributes).some(({ name }) => {
      return name.startsWith("ariane-");
    })
  );

export const getLinkFromEvent = (e: MouseEvent) => {
  const el = e.target as HTMLElement | null;
  if (!el) return;
  const link = el.closest("a");
  if (!link) return;
  return link;
};
