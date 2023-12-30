"use client";
import Image from "next/image";

interface Props {
  image: string;
}

const TopBanner = (props: Props) => {
  return (
    <div>
      {/* <Image  /> */}
      <div className="w-44 h-44 rounded bg-blue-500"></div>
    </div>
  );
};

export default TopBanner;
