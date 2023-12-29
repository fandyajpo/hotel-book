export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { hotelById, updateHotel, delHotel } from "@/query/hotel";
import { HotelT, Params } from "@/types";
import imageKit from "@/lib/imageKit";

export async function GET(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const rooms = await hotelById(params?.key);
    return NextResponse.json(rooms);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const body = await req.json();
    const update = await updateHotel(
      params?.key,
      body?.name,
      body?.category ?? "",
      body?.location ?? "",
      body?.status ?? "DRAFT",
      body?.description ?? "",
      body?.currency ?? "IDR",
      body?.slug
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
    const hotel: HotelT = await hotelById(params?.key);

    if (!hotel) {
      return NextResponse.json({ success: false, message: "no data" });
    }

    const history: HotelT = await delHotel(params?.key);

    if (history.image && history.image.length > 0) {
      const idOfFile = history.image.map((a) => a.id);
      await imageKit.bulkDeleteFiles(idOfFile);
    }

    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json(err);
  }
}
