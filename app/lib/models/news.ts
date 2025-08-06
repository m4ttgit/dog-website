import { z } from "zod";

// Domain schema for a News item used by the API/UI.
// Adjust fields to match your data source / Supabase table.
export const NewsItemSchema = z.object({
  id: z.union([z.number(), z.string()]),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().url().optional(),
  publishedAt: z.string().or(z.date()).optional(),
  source: z.string().optional(),
});

export type NewsItem = z.infer<typeof NewsItemSchema>;

export const NewsListSchema = z.array(NewsItemSchema);
export type NewsList = z.infer<typeof NewsListSchema>;
