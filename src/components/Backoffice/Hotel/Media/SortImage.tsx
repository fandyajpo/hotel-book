"use client";
import { ImageKitFileT } from "@/lib/imageKit";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface Props {
  image: ImageKitFileT;
}

export function SortableItem(props: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="w-24 h-24 relative" key={props?.image.name}>
        <Image
          src={`${props?.image.url}`}
          alt={`${props?.image.name}`}
          className="w-full h-full object-cover z-10"
          fill
        />
      </div>
    </div>
  );
}
