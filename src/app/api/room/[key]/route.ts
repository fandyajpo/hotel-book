import { NextResponse } from "next/server";
import { Params } from "@/types";
import { roomById, updateRoom } from "@/query/room";

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
