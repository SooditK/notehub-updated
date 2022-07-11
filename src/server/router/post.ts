import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";

export const postRouter = createRouter()
  .query("getuserfromid", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
        select: {
          id: true,
        },
      });
      return user;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("allposts", {
    async resolve({ ctx }) {
      const posts = await prisma.post.findMany({
        where: {
          author: {
            email: ctx.session?.user?.email,
          },
        },
        include: {
          Subject: true,
        },
      });
      return { success: true, posts };
    },
  })
  .mutation("createpost", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      link: z.string(),
      subjectname: z.string(),
      subjectcode: z.string(),
      university: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      const newpost = await prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          link: input.link,
          university: input.university,
          Subject: {
            connectOrCreate: {
              create: {
                name: input.subjectname,
                code: input.subjectcode,
              },
              where: {
                code: input.subjectcode,
              },
            },
          },
          author: {
            connect: {
              email: ctx.session!!.user!!.email!,
            },
          },
        },
      });
      return {
        success: true,
        post: newpost,
      };
    },
  })
  .mutation("updatepost", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      link: z.string(),
      subjectname: z.string(),
      subjectcode: z.string(),
      university: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      const updatedPost = await prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          university: input.university,
          link: input.link,
          Subject: {
            connectOrCreate: {
              create: {
                name: input.subjectname,
                code: input.subjectcode,
              },
              where: {
                code: input.subjectcode,
              },
            },
          },
        },
      });
      return {
        success: true,
        post: updatedPost,
      };
    },
  })
  .mutation("deletepost", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const deletedPost = await prisma.post.delete({
        where: {
          id: input.id,
        },
      });
      return {
        success: true,
        post: deletedPost,
      };
    },
  });
