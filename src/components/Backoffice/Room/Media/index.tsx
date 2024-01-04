"use client";
import { client } from "@/lib/axios";
import { resizeFile } from "@/lib/resizeFile";
import { queryClient } from "@/provider/TanstackQuery";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent } from "react";
import { ImageKitFileT } from "@/lib/imageKit";
import { LoadingSVG } from "@/components/Icons";
import Title from "../../../Arch/Title";
import Test from "./Images";

type Media = {
  media?: Array<ImageKitFileT>;
  hotelKey?: string;
};

const RoomMedia = (props: Media) => {
  const params = useParams();
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file: any = e?.target?.files?.[0];
      const image: any = await resizeFile?.(file);
      return mutate(image);
    } catch (err) {
      return null;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateRoomMedia"],
    mutationFn: (image) =>
      client.patch(
        `api/room/${params?.id}/media`,
        {
          image: image,
        },
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["room"],
      }),
  });

  return (
    <div className="relative">
      <div className="border border-gray-300 p-4 bg-white/90 rounded space-y-2 z-20">
        <Title title="Hotel Media" />
        {isPending ? (
          <LoadingSVG className="w-6 h-6" />
        ) : (
          <Test
            image={props?.media as ImageKitFileT[]}
            hotelKey={props?.hotelKey ? props?.hotelKey : undefined}
          />
        )}
        <input onChange={onChange} accept="image/*" type="file" />
      </div>
    </div>
  );
};

export default RoomMedia;
