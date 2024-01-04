"use client";

import { LoadingSVG } from "@/components/Icons";
import { client } from "@/lib/axios";
import { documentById } from "@/lib/listFunc";
import { queryClient } from "@/provider/TanstackQuery";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
interface Props {
  hotelKey?: string;
  imageIndex?: number;
  imageId?: string;
}

const DeleteRoomMedia = (props: Props) => {
  const params = useParams();
  const { mutate, isPending } = useMutation({
    mutationKey: ["removeHotelImage"],
    mutationFn: () =>
      client.patch(
        `api/room/${params?.id}/media`,
        {
          method: "DELETE_IMAGE",
          index: Number(props?.imageIndex),
          imageId: props?.imageId,
        },
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: () => {
      documentById?.(props?.imageId as string)?.close?.();
      return queryClient.invalidateQueries({
        queryKey: ["room"],
      });
    },
  });

  return (
    <div className="bg-white space-y-4 p-4">
      {isPending ? null : (
        <button
          className="text-red-500"
          onClick={() => documentById?.(props?.imageId as string)?.close?.()}
        >
          Close
        </button>
      )}

      <p>You sure to delete the image?</p>
      {isPending ? (
        <LoadingSVG className="w-6 h-6 text-black" />
      ) : (
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className="text-red-500 border border-red-500 p-1 rounded"
        >
          Remove it
        </button>
      )}
    </div>
  );
};

export default DeleteRoomMedia;
