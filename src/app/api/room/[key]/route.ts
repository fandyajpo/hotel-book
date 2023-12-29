import { NextResponse } from "next/server";
import { Params, RoomT } from "@/types";
import { roomById, updateRoom, delRoom } from "@/query/room";
import imageKit from "@/lib/imageKit";

export async function GET(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const rooms = await roomById(params?.key);
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
    const update = await updateRoom(
      params?.key,
      body?.name,
      body?.status,
      body?.description,
      Number(body?.bed),
      Number(body?.bath),
      Number(body?.price)
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
    const hotel: RoomT = await roomById(params?.key);

    if (!hotel) {
      return NextResponse.json({ success: false, message: "no data" });
    }

    const history: RoomT = await delRoom(params?.key);

    if (history.image && history.image.length > 0) {
      const idOfFile = history.image.map((a) => a.id);
      await imageKit.bulkDeleteFiles(idOfFile);
    }

    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json(err);
  }
}
