export const dynamic = "force-dynamic";
import { hotelByLocation } from "@/query/hotel";
import { Params } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Params<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const rPage = Number(page) - 1;

    if (!page || !limit)
      return NextResponse.json({
        success: false,
        message: "provide limit and page number",
      });

    const hotel = await hotelByLocation(
      rPage * Number(limit),
      Number(limit),
      params.id
    );
    return NextResponse.json(hotel);
  } catch (err) {
    return NextResponse.json(err);
  }
}
