"use client";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
const MenuSelector = () => {
  const segment = useSelectedLayoutSegment();
  const params = useParams();
  return (
    <div className="border p-4 space-x-2 rounded bg-white/90">
      <Link
        href={`/bo/hotel/${params.key}`}
        className={`${
          !segment ? "bg-blue-500 text-white" : ""
        } px-4 py-1 duration-500 rounded`}
      >
        Main
      </Link>
      <Link
        href={`/bo/hotel/${params.key}/room`}
        className={`${
          segment === "room" ? "bg-blue-500 text-white" : ""
        } px-4 py-1 duration-500 rounded`}
      >
        Room
      </Link>
    </div>
  );
};

export default MenuSelector;
