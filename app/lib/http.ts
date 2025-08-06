import { NextResponse } from "next/server";

type Pagination = {
  page: number;
  pageSize: number;
  total?: number;
};

export function parsePagination(searchParams: URLSearchParams, defaults: { page?: number; pageSize?: number } = {}) {
  const page = Math.max(1, Number(searchParams.get("page") ?? defaults.page ?? 1));
  const size = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? defaults.pageSize ?? 20)));
  return { page, pageSize: size } as Pagination;
}

export function cacheHeaders(seconds: number, staleWhileRevalidateSeconds = 86400) {
  return {
    "Cache-Control": `public, s-maxage=${seconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`,
  };
}

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function jsonOkWithPagination<T>(data: T, pagination: Pagination, init?: ResponseInit) {
  return NextResponse.json({ data, pagination }, init);
}

export function jsonError(code: string, message: string, status = 500, init?: Omit<ResponseInit, "status">) {
  return NextResponse.json({ error: { code, message } }, { ...init, status });
}
