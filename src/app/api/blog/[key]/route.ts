import { Params } from "@/types";
import { NextResponse } from "next/server";
import { blogById, updateBlogMetadata, updateBlog } from "@/query/blog";
export async function GET(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const rooms = await blogById(params?.key);
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

    if (body.hasOwnProperty("method") && body?.method === "SAVE_BLOG") {
      if (!body?.html)
        return NextResponse.json({
          success: false,
          message: "no content saved",
        });

      const removeHotelImage = await updateBlog(params?.key, body?.html);

      return NextResponse.json(removeHotelImage);
    }

    // SAVE_BLOG
    const update = await updateBlogMetadata(
      params?.key,
      body?.title,
      body?.description,
      body?.slug
    );

    return NextResponse.json(update);
  } catch (err) {
    return NextResponse.json(err);
  }
}
