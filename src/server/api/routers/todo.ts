import { z } from "zod";

import { createTRPCRouter,publicProcedure } from "../trpc";
import { todoInput } from "../../../type"; 
import { appRouter } from "../root";
export const todoRouter = createTRPCRouter({

  all: publicProcedure.query(async ({ ctx }) => {
    const todos=await ctx.prisma.todo.findMany();
    
    return todos
  }),

  create: publicProcedure
    .input(
      todoInput
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const new_todo = await ctx.prisma.todo.create({
          data: {
            content: input,
          },
        });
        return new_todo;
      } catch (error) {
        throw new Error("Error creating todo");
      }
    }),

    delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedTodo = await ctx.prisma.todo.delete({
        where: { id: input.id },
      });
      return deletedTodo;
    }),
  

  toggle: publicProcedure.input(z.object({ id: z.number(), done: z.boolean() })).mutation(async ({ ctx, input }) => {
    try {
      const todoToToggle = await ctx.prisma.todo.findUnique({
        where: { id: input.id },
      });
      if (!todoToToggle) {
        throw new Error("Todo not found");
      }

      const updatedTodo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        },
      });
      return updatedTodo;
    } catch (error) {
      throw new Error("Error toggling todo status");
    }
  }),
});
