import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { prisma } from '../db/client';
import { z } from 'zod';

export const likesRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('createlike', {
    input: z.object({
      postid: z.string(),
    }),
    async resolve({ input, ctx }) {
      const newlike = await prisma.likes.create({
        data: {
          post: {
            connect: {
              id: input.postid,
            },
          },
          user: {
            connect: {
              email: ctx.session!!.user!!.email!,
            },
          },
        },
      });
      return newlike;
    },
  })
  .mutation('deletelike', {
    input: z.object({
      postid: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = await prisma.user.findFirst({
        where: {
          email: ctx.session!!.user!!.email!,
        },
      });
      const deleteLike = await prisma.likes.delete({
        where: {
          id: input.postid,
        },
      });
      return deleteLike;
    },
  });
