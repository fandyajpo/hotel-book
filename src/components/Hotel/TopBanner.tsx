"use client";
import { HotelT } from "@/types";
import Image from "next/image";

interface Props {
  hotel: HotelT;
}

const TopBanner = (props: Props) => {
  return (
    <div>
      <div className="w-44 h-44 rounded bg-blue-500"></div>
    </div>
  );
};

export default TopBanner;
