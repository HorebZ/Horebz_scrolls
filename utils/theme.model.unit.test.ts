import { assertEquals } from "jsr:@std/assert";
import { themeClass } from "./theme.model.ts";

Deno.test("themeClass should return the correct theme class", () => {
  assertEquals(themeClass("light"), "");
  assertEquals(themeClass("dark"), "dark");
  assertEquals(themeClass("mordor"), "mordor");
});
