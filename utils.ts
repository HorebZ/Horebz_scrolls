import { createDefine } from "fresh";

/**
 * This specifies the type of "ctx.state" which is used to share
 * data among middlewares, layouts and routes.
 */
export interface State {
  theme: "light" | "dark" | "mordor";
}

export const define = createDefine<State>();
