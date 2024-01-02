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
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useParams } from "next/navigation";
import { LoadingSVG } from "@/components/Icons";
interface Props {
  image: ImageKitFileT[];
}

function Test(props: Props) {
  const params = useParams();
  const [images, setImages] = useState(props?.image);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateHotelImagePosition"],
    mutationFn: () =>
      client.patch(
        `api/hotel/${params?.key}/media`,
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
  });

  return (
    <div className="relative">
      {isPending ? (
        <div className="w-full h-full bg-white/70 absolute z-20 flex justify-center items-center">
          <LoadingSVG className="text-black w-12 h-12" />
        </div>
      ) : null}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-2 flex-none overflow-x-auto w-full">
            {images.map((im) => (
              <SortableItem key={im.id} image={im} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
      mutate();
    }
  }
}

export default Test;
