import { locationBySlug } from "@/query/location";
import { Params } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Params<{ slug: string }> }
) {
  try {
    const locat = await locationBySlug(params.slug);

    return NextResponse.json(locat);
  } catch (err) {
    return NextResponse.json(err);
  }
}
