import { z } from "zod";

// Domain schema for a Breed record used by the API/UI.
// Adjust fields to match your Supabase table/JSON shape.
export const BreedSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  slug: z.string(),
  group: z.string().optional(),
  size: z.string().optional(),
  temperament: z.string().optional(),
  imageUrl: z.string().url().optional(),
  origin: z.string().optional(),
  lifeSpan: z.string().optional(),
});

export type Breed = z.infer<typeof BreedSchema>;

export const BreedListSchema = z.array(BreedSchema);
export type BreedList = z.infer<typeof BreedListSchema>;
