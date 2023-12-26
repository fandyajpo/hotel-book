export const dynamic = "force-dynamic";
import { createCategory, listCategory } from "@/query/category";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const rPage = Number(page) - 1;

    if (!page || !limit)
      return NextResponse.json({
        success: false,
        message: "provide limit and page number",
      });

    const cat = await listCategory(rPage * Number(limit), Number(limit));
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await createCategory(body.name);
    revalidatePath("/bo/category");
    return NextResponse.json(create);
  } catch (err) {
    return NextResponse.json(err);
  }
}
