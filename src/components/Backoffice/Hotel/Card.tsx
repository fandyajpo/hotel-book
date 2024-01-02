import { HotelT, StatusT } from "@/types";
import Link from "next/link";
import { HotelStatus } from "@/lib/cardStatus";
const HotelCard = (props: HotelT) => {
  return (
    <div className="bg-white/90 border border-gray-300 h-44 rounded p-4 flex justify-between">
      <div>
        <p className="text-gray-700">{props.name}</p>
        <HotelStatus status={props?.status as StatusT} />
      </div>
      <p>{props.category?.name}</p>
      <Link
        href={`/bo/hotel/${props._key}`}
        className="bg-white w-fit h-fit p-1 rounded"
      >
        Edit
      </Link>
    </div>
  );
};

export default HotelCard;
