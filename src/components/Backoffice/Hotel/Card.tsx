import { HotelT } from "@/types";
import Link from "next/link";

const HotelCard = (props: HotelT) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-44 rounded p-4 flex justify-between">
      <p className="text-white">{props.name}</p>
      <p>{props.category?.name}</p>
      <Link href={`/bo/hotel/${props._key}`}>Edit</Link>
    </div>
  );
};

export default HotelCard;
