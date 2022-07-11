import { createRouter } from "./context";
import { z } from "zod";
import { prisma } from "../db/client";

export const searchRouter = createRouter()
  .query("notes", {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ input }) {
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input.text,
              },
            },
            {
              description: {
                contains: input.text,
              },
            },
            {
              Subject: {
                name: {
                  contains: input.text,
                },
              },
            },
            {
              Subject: {
                code: {
                  contains: input.text,
                },
              },
            },
            {
              university: {
                contains: input.text,
              },
            },
          ],
        },
        include: {
          author: true,
          Subject: true,
          Likes: true,
        },
      });
      return posts;
    },
  })
  .query("infiniteNotes", {
    input: z.object({
      limit: z.number().min(1).nullish(),
      cursor: z.number().nullish(),
      text: z.string(),
    }),
    async resolve({ input }) {
      const limit = input.limit || 6;
      const { cursor } = input;
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input.text,
              },
            },
            {
              description: {
                contains: input.text,
              },
            },
            {
              Subject: {
                name: {
                  contains: input.text,
                },
              },
            },
            {
              Subject: {
                code: {
                  contains: input.text,
                },
              },
            },
            {
              university: {
                contains: input.text,
              },
            },
          ],
        },
        take: limit + 1,
        cursor: {
          id: String(cursor),
        },
        include: {
          author: true,
          Subject: true,
          Likes: true,
        },
      });
      let nextCursor: typeof cursor | null = null;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = Number(nextItem?.id);
      }
      return {
        posts,
        nextCursor,
      };
    },
  });
