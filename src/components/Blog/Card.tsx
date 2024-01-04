import { BlogT } from "@/types";
import Link from "next/link";

const HotelCard = (props: BlogT) => {
  return (
    <div className="bg-gray-200 border border-gray-300 h-44 rounded p-2 flex justify-between">
      <div>
        <p className="text-gray-700">{props.title}</p>
      </div>
      <Link
        href={`/blog/${props.slug}`}
        className="bg-white w-fit h-fit p-1 rounded"
      >
        Read
      </Link>
    </div>
  );
};

export default HotelCard;
