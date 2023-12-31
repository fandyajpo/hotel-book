export const dynamic = "force-dynamic";
import { searchLocation } from "@/query/location";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const cat = await searchLocation(String(search));
    console.log(cat);
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json(err);
  }
}
