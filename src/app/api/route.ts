import { createPing } from "@/lib/arangoDb";
import { NextResponse } from "next/server";
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("name");
  try {
    return NextResponse.json({ message: "NextJS API", data: data });
  } catch (err: any) {
    return NextResponse.json({ message: "NextJS API", error: err?.message });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const ping = await createPing(body?.message);
    return NextResponse.json({ message: "NextJS API", data: ping });
  } catch (err: any) {
    return NextResponse.json({ message: "NextJS API", error: err?.message });
  }
};
