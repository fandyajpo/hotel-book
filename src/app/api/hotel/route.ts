export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { listHotel, createHotel } from "@/query/hotel";
import { StatusT } from "@/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const status = searchParams.get("status");

    const rPage = Number(page) - 1;

    if (!page || !limit)
      return NextResponse.json({
        success: false,
        message: "provide limit and page number",
      });

    const rooms = await listHotel(
      rPage * Number(limit),
      Number(limit),
      status as StatusT
    );
    return NextResponse.json(rooms);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await createHotel(
      body?.name ?? "",
      body?.category ?? "",
      body?.location ?? "",
      body?.status ?? "DRAFT",
      body?.description ?? "",
      body?.currency ?? "",
      body?.slug
    );

    return NextResponse.json(create);
  } catch (err) {
    return NextResponse.json(err);
  }
}
