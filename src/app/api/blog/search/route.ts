export const dynamic = "force-dynamic";
import { searchBlog } from "@/query/blog";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const cat = await searchBlog(String(search));
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json(err);
  }
}
