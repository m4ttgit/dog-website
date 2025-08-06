import { z } from "zod";

export const PaginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Math.max(1, Number(v)) : 1)),
  pageSize: z
    .string()
    .optional()
    .transform((v) => {
      const n = v ? Number(v) : 20;
      return Math.min(100, Math.max(1, n));
    }),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const SearchQuerySchema = z.object({
  q: z.string().optional().transform((v) => (v ?? "").trim()),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
