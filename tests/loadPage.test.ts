import { describe, it, expect } from "vitest";
import { loadPage } from "../src/loadPage";

describe.only("loadPage", () => {
  it("updates the page with the new content", () => {
    document.write(`
    <html>
		  <head>
			<title>Old Title</title>
		  </head>
		  <body>
		  </body>
		</html>
	  `);
    const newTitle = "New page title";
    const newHtml = `
		<html>
		  <head>
			<title>${newTitle}</title>
		  </head>
		  <body>
			<h1>New page content</h1>
		  </body>
		</html>
	  `;

    loadPage(newHtml);

    expect(document.title).toBe(newTitle);
    expect(document.querySelector("h1")).toBeTruthy();
  });
});
