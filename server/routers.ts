import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { travelService, SearchFilters } from "../services/travelService";
import { z } from "zod";
import { getDb } from "./db";
import { itineraryItems } from "../drizzle/schema";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  travel: router({
    search: publicProcedure
      .input(
        z.object({
          query: z.string(),
          type: z.enum(["all", "flights", "activities"]),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        return await travelService.search(input as SearchFilters);
      }),
    
    saveToTrip: protectedProcedure
      .input(
        z.object({
          tripId: z.number(),
          title: z.string(),
          description: z.string().optional(),
          itemDate: z.string(), // YYYY-MM-DD
          location: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");

        const [newItem] = await database
          .insert(itineraryItems)
          .values({
            tripId: input.tripId,
            title: input.title,
            description: input.description,
            itemDate: input.itemDate,
            location: input.location,
          })
          .returning();

        return newItem;
      }),
  }),
});

export type AppRouter = typeof appRouter;


// import { COOKIE_NAME } from "../shared/const.js";
// import { getSessionCookieOptions } from "./_core/cookies";
// import { systemRouter } from "./_core/systemRouter";
// import { publicProcedure, router } from "./_core/trpc";

// export const appRouter = router({
//   // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
//   system: systemRouter,
//   auth: router({
//     me: publicProcedure.query((opts) => opts.ctx.user),
//     logout: publicProcedure.mutation(({ ctx }) => {
//       const cookieOptions = getSessionCookieOptions(ctx.req);
//       ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
//       return {
//         success: true,
//       } as const;
//     }),
//   }),

//   // TODO: add feature routers here, e.g.
//   // todo: router({
//   //   list: protectedProcedure.query(({ ctx }) =>
//   //     db.getUserTodos(ctx.user.id)
//   //   ),
//   // }),
// });

// export type AppRouter = typeof appRouter;
