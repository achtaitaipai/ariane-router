import { vi } from "vitest";

vi.stubGlobal("location", { href: "/example.com" });
vi.stubGlobal("scrollTo", () => {});
