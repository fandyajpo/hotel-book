export const dynamic = "force-dynamic";
import { updateHotelRoomSummary } from "@/query/room";
import { Params } from "@/types";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ key: string; hotelKey: string }> }
) {
  try {
    const body = await req.json();
    const update = await updateHotelRoomSummary(
      params.key,
      params.hotelKey,
      Number(body?.bath),
      Number(body?.bed)
    );

    return NextResponse.json(update);
  } catch (err) {
    return NextResponse.json(err);
  }
}
