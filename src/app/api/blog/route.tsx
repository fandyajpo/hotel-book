import { NextResponse } from "next/server";
import { createBlog } from "@/query/blog";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await createBlog();
    return NextResponse.json(create);
  } catch (err) {
    return NextResponse.json(err);
  }
}
