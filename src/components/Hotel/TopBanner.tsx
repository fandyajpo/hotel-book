"use client";
import { HotelT } from "@/types";
import ImageLoader from "../Layout/ImageLoader";
import { documentById } from "@/lib/listFunc";
interface Props {
  data: HotelT;
}

const TopBanner = (props: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full h-[500px]">
        <div className="col-span-2 row-span-2 w-full h-full rounded bg-blue-500">
          <ImageLoader imageSource={props?.data?.image?.[0]?.url} />
        </div>
        <div className="rounded bg-blue-500">
          <ImageLoader imageSource={props?.data?.image?.[1]?.url} />
        </div>
        <div className="rounded bg-blue-500">
          <ImageLoader imageSource={props?.data?.image?.[2]?.url} />
        </div>
        <div className="rounded bg-blue-500">
          <ImageLoader imageSource={props?.data?.image?.[3]?.url} />
        </div>
        <div className="rounded bg-blue-500">
          <ImageLoader
            imageSource={
              props?.data?.image && props?.data?.image?.length > 3
                ? props?.data?.image?.[4]?.url
                : ""
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-blue-500/20 rounded py-1 px-2 w-fit text-blue-500">
          {props.data.category?.name}
        </div>
        <div className="bg-gray-500/20 rounded py-1 px-2 w-fit text-gray-500">
          {props.data.location?.name}
        </div>
      </div>
      <p className="text-black">{props.data.description}</p>
    </div>
  );
};

export default TopBanner;
