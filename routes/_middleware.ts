import { define } from "../utils.ts";

export default define.middleware(async (ctx) => {
  const cookie = ctx.req.headers.get("cookie") || "";
  const theme = cookie.match(/theme=(dark|light)/)?.[1] || "light";

  ctx.state.theme = theme as "light" | "dark";

  const resp = await ctx.next();
  return resp;
});
