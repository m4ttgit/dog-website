import { NextRequest } from "next/server";
import { supabaseServer } from "@/app/lib/server/supabaseServer";
import { jsonError, jsonOkWithPagination, cacheHeaders } from "@/app/lib/http";
import { NewsListSchema } from "@/app/lib/models/news";
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
      .from("news")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("publishedAt", { ascending: false });

    if (q) {
      // Assuming 'title' or 'slug' fields exist; adjust ilike filters to match schema
      query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return jsonError("NEWS_FETCH_FAILED", "Failed to fetch news", 500, {
        headers: cacheHeaders(CACHE_SECONDS),
      });
    }

    const parsed = NewsListSchema.safeParse(data ?? []);
    if (!parsed.success) {
      return jsonError("NEWS_SHAPE_INVALID", "Unexpected news data shape", 500, {
        headers: cacheHeaders(CACHE_SECONDS),
      });
    }

    return jsonOkWithPagination(parsed.data, { page, pageSize, total: count ?? undefined }, { headers: cacheHeaders(CACHE_SECONDS) });
  } catch {
    return jsonError("NEWS_UNEXPECTED", "An unexpected error occurred", 500, {
      headers: cacheHeaders(CACHE_SECONDS),
    });
  }
}
