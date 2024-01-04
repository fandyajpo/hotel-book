"use client";
import ImageLoader from "@/components/Layout/ImageLoader";
import { ImageKitFileT } from "@/lib/imageKit";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  image: ImageKitFileT;
}

export function SortableItem(props: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props?.image?.id });

  const style = {
    transform: CSS?.Transform?.toString?.(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="w-24 h-24" key={props?.image?.name}>
        <ImageLoader imageSource={`${props?.image?.url}`} />
      </div>
    </div>
  );
}
