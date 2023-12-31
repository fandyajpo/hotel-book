import imageKit from "@/lib/imageKit";
import { updateHotelMedia } from "@/query/hotel";
import { Params } from "@/types";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Params<{ key: string }> }
) {
  try {
    const body = await req.json();

    if (body.hasOwnProperty("method") && body.method === "SAVE_POSITION") {
    }

    if (!body.image) return { success: false, message: "No image provide" };

    const upload = await imageKit.upload({
      file: body.image,
      fileName: "test",
    });

    const updateMedia = await updateHotelMedia(params.key, {
      id: upload?.fileId,
      name: upload?.name,
      url: upload?.url,
    });
    return NextResponse.json(updateMedia);
  } catch (err) {
    return NextResponse.json(err);
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: Params<{ key: string }> }
// ) {
//   try {
//     const body = await req.json();

//     if (!body.image) return { success: false, message: "No image provide" };

//     const upload = await imageKit.upload({
//       file: body.image,
//       fileName: "test",
//     });

//     const updateMedia = await updateHotelMedia(params.key, {
//       id: upload.fileId,
//       name: upload.name,
//       url: upload.url,
//     });
//     return NextResponse.json(updateMedia);
//   } catch (err) {
//     return NextResponse.json(err);
//   }
// }
