export const dynamic = "force-dynamic";
import { updateBookingStatus, bookingById, delBook } from "@/query/booking";
import { BookingT, Params } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const cat = await updateBookingStatus(params?.key, "974193", "AVAILABLE");
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const hotel: BookingT = await bookingById(params.key);

    if (!hotel) {
      return NextResponse.json({ success: false, message: "no data" });
    }

    const history: BookingT = await delBook(params.key);

    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json(err);
  }
}
