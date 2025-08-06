import { NextRequest } from "next/server";
import { supabaseServer } from "@/app/lib/server/supabaseServer";
import { jsonError, jsonOkWithPagination, cacheHeaders } from "@/app/lib/http";
import { BreedListSchema } from "@/app/lib/models/breed";
import { PaginationQuerySchema, SearchQuerySchema } from "@/app/lib/validation/params";

// Cache policy: cache for 1 hour at the edge/CDN, allow stale for 24h
const CACHE_SECONDS = 3600;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, pageSize } = PaginationQuerySchema.parse({
      page: searchParams.get("page") ?? undefined,
      pageSize: searchParams.get("pageSize") ?? undefined,
    });
    const { q } = SearchQuerySchema.parse({
      q: searchParams.get("q") ?? undefined,
    });

    // Supabase query with pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabaseServer
      .from("breeds")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("name", { ascending: true });

    if (q) {
      // Assuming 'name' or 'slug' fields exist; adjust ilike filters to match schema
      query = query.or(`name.ilike.%${q}%,slug.ilike.%${q}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return jsonError("BREEDS_FETCH_FAILED", "Failed to fetch breeds", 500, {
        headers: cacheHeaders(CACHE_SECONDS),
      });
    }

    const parsed = BreedListSchema.safeParse(data ?? []);
    if (!parsed.success) {
      return jsonError("BREEDS_SHAPE_INVALID", "Unexpected breeds data shape", 500, {
        headers: cacheHeaders(CACHE_SECONDS),
      });
    }

    return jsonOkWithPagination(parsed.data, { page, pageSize, total: count ?? undefined }, { headers: cacheHeaders(CACHE_SECONDS) });
  } catch {
    return jsonError("BREEDS_UNEXPECTED", "An unexpected error occurred", 500, {
      headers: cacheHeaders(CACHE_SECONDS),
    });
  }
}
