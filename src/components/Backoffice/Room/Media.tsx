"use client";
import { client } from "@/lib/axios";
import { resizeFile } from "@/lib/resizeFile";
import { queryClient } from "@/provider/TanstackQuery";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent } from "react";
import { ImageKitFileT } from "@/lib/imageKit";
import { LoadingSVG } from "@/components/Icons";
import Title from "../../Arch/Title";
type Media = {
  media?: Array<ImageKitFileT>;
};

const HotelMedia = (props: Media) => {
  const params = useParams();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file: any = e?.target?.files?.[0];
      const image: any = await resizeFile(file);
      return mutate(image);
    } catch (err) {
      return null;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateHotelMedia"],
    mutationFn: (image) =>
      client.patch(
        `/api/hotel/${params?.key}/media`,
        {
          image: image,
        },
        {
          method: "PATCH",
        }
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["hotel"],
      }),
  });

  return (
    <div className="relative">
      <div className="border border-gray-300 p-4 rounded space-y-2 z-20">
        <Title title="Hotel Media" />
        {isPending ? (
          <LoadingSVG className="w-6 h-6" />
        ) : (
          <input onChange={onChange} accept="image/*" type="file" />
        )}
        <div className="flex gap-2">
          {props?.media?.map((a: ImageKitFileT) => (
            <div className="w-24 h-24 relative" key={a?.name}>
              <Image
                src={`${a?.url}`}
                alt={`${a?.name}`}
                className="w-full h-full object-cover z-10"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelMedia;
