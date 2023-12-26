export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { categoryById, delCat, updateCategory } from "@/query/category";
import { HotelT, Params } from "@/types";

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const body = await req.json();
    const update = await updateCategory(params.key, body.name);
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
    const hotel: HotelT = await categoryById(params.key);

    if (!hotel) {
      return NextResponse.json({ success: false, message: "no data" });
    }

    const history: HotelT = await delCat(params.key);

    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json(err);
  }
}
