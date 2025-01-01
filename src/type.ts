import {z} from "zod"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "../../todo/src/server/api/root"
type RouterOutputs= inferRouterOutputs<AppRouter>
type allTodoType=RouterOutputs['todo']["all"]
export type TodoType=allTodoType[number]
export const todoInput = z
  .string({
    required_error: "Describe your todo",
  })
  .min(1)
  .max(50);