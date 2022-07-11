// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { postRouter } from "./post";
import { searchRouter } from "./search";
import { likesRouter } from "./likes";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("search.", searchRouter)
  .merge("auth.", authRouter)
  .merge("post.", postRouter)
  .merge("likes.", likesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
