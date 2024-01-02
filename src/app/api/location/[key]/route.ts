export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { updateLocation, locationById, delLocation } from "@/query/location";
import { CategoryT, Params } from "@/types";

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const body = await req.json();
    const update = await updateLocation(
      params.key,
      body?.name,
      body?.slug,
      body?.description
    );
    return NextResponse.json(update);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const hotel: CategoryT = await locationById(params.key);
    if (!hotel) {
      return NextResponse.json({ success: false, message: "no data" });
    }
    const history: CategoryT = await delLocation(params.key);
    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json(err);
  }
}
