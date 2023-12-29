import { NextResponse } from "next/server";
import { listRoom, createRoom } from "@/query/room";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const hotel = searchParams.get("hotel");

    const rPage = Number(page) - 1;

    if (!page || !limit)
      return NextResponse.json({
        success: false,
        message: "provide limit and page number",
      });

    const rooms = await listRoom(
      rPage * Number(limit),
      Number(limit),
      String(hotel)
    );

    return NextResponse.json(rooms);
  } catch (err) {
    return NextResponse.json({ err });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await createRoom(
      body?.name ?? "",
      body?.hotel ?? "",
      body?.status ?? "DRAFT",
      body?.description ?? "",
      Number(body?.bed ?? 1),
      Number(body?.bath ?? 1),
      Number(body?.price ?? 1)
    );

    return NextResponse.json(create);
  } catch (err) {
    return NextResponse.json(err);
  }
}
