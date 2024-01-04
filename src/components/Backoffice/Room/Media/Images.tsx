"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortImage";
import { ImageKitFileT } from "@/lib/imageKit";
import { client } from "@/lib/axios";
import { useParams } from "next/navigation";
import { LoadingSVG, X } from "@/components/Icons";
import { useMutation } from "@tanstack/react-query";
import Modal from "@/components/Arch/Modal";
import DeleteHotelMedia from "./Delete";
import { documentById } from "@/lib/listFunc";
import { queryClient } from "@/provider/TanstackQuery";
interface Props {
  hotelKey?: string;
  image: ImageKitFileT[];
}

function Images(props: Props) {
  const params = useParams();
  const [images, setImages] = useState<ImageKitFileT[]>(props?.image);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateHotelImagePosition"],
    mutationFn: () =>
      client.patch(
        `api/room/${params?.id}/media`,
        {
          method: "SAVE_POSITION",
          image: images,
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
      <p className="mb-2">
        You cannot delete the initial image as it serves as the main image
      </p>
      {isPending ? (
        <div className="w-full h-full bg-white/70 absolute z-20 flex justify-center items-center">
          <LoadingSVG className="text-black w-12 h-12" />
        </div>
      ) : null}
      {images && images.length > 0 ? (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-2 flex-none overflow-x-auto w-full">
              {images?.map?.((im: ImageKitFileT, index: number) => (
                <div key={im?.id} className="relative group">
                  <Modal id={im?.id}>
                    <DeleteHotelMedia
                      imageId={im.id}
                      hotelKey={props?.hotelKey ? props?.hotelKey : undefined}
                      imageIndex={index}
                    />
                  </Modal>
                  <button
                    type="button"
                    onClick={() =>
                      documentById(im?.id as string)?.showModal?.()
                    }
                    className="w-8 h-8 hidden group-hover:flex absolute bg-red-500 top-1 right-1 rounded-md items-center justify-center z-20"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <SortableItem key={im?.id} image={im} />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : null}
    </div>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setImages((items) => {
        const activeIndex = items?.findIndex((item) => item?.id === active?.id);
        const overIndex = items?.findIndex((item) => item?.id === over?.id);
        return arrayMove(items, activeIndex, overIndex);
      });
      mutate();
    }
  }
}

export default Images;
