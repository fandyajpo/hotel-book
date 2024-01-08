import { NextResponse } from "next/server";

export const revalidate = 0;
export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ ok: true });
}
