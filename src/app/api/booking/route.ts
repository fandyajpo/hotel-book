export const dynamic = "force-dynamic";
import { createBooking, listBooking } from "@/query/booking";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await createBooking(body);
    return NextResponse.json(create);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    const rPage = Number(page) - 1;

    if (!page || !limit)
      return NextResponse.json({
        success: false,
        message: "provide limit and page number",
      });

    const cat = await listBooking(
      rPage * Number(limit),
      Number(limit),
      String(checkIn),
      String(checkOut)
    );
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json(err);
  }
}
