import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API route disabled" }, { status: 503 });
}
