"use client";
import { RoomT } from "@/types";
import ImageLoader from "../Layout/ImageLoader";
interface Props {
  data: RoomT;
}

const TopBanner = (props: Props) => {
  return (
    <div className="space-y-4 flex-none w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 flex-none lg:grid-cols-4 gap-2 w-full h-[500px]">
        <div className="col-span-2 row-span-2 w-full h-full rounded flex-none">
          <ImageLoader imageSource={props?.data?.image?.[0]?.url} />
        </div>
        <div className="rounded w-full h-full">
          <ImageLoader imageSource={props?.data?.image?.[1]?.url} />
        </div>
        <div className="rounded w-full h-full">
          <ImageLoader imageSource={props?.data?.image?.[2]?.url} />
        </div>
        <div className="rounded w-full h-full">
          <ImageLoader imageSource={props?.data?.image?.[3]?.url} />
        </div>
        <div className="rounded w-full h-full">
          <ImageLoader
            imageSource={
              props?.data?.image && props?.data?.image?.length > 3
                ? props?.data?.image?.[4]?.url
                : ""
            }
          />
        </div>
      </div>

      <p className="text-black">{props?.data?.description}</p>
    </div>
  );
};

export default TopBanner;
