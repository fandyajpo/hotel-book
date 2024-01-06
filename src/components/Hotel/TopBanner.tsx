"use client";
import { HotelT } from "@/types";
import Link from "next/link";
import ImageLoader from "../Layout/ImageLoader";
import { FacebookSVG, InstagramSVG, WhatsappSVG, YoutubeSVG } from "../Icons";
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
          {props?.data?.category?.name}
        </div>
        <div className="bg-gray-500/20 rounded py-1 px-2 w-fit text-gray-500">
          {props?.data?.location?.name}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {props.data.contact?.instagramUrl && props.data.contact?.instagram ? (
          <div className="flex gap-2 items-center">
            <InstagramSVG className="w-6 h-6" />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:underline"
              href={`${props.data?.contact?.instagramUrl}`}
            >
              {props.data?.contact?.instagram}
            </Link>
          </div>
        ) : null}
        {props.data.contact?.youtubeUrl && props.data.contact?.youtube ? (
          <div className="flex gap-2 items-center">
            <YoutubeSVG className="w-6 h-6" />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:underline"
              href={`${props.data?.contact?.youtubeUrl}`}
            >
              {props.data?.contact?.youtube}
            </Link>
          </div>
        ) : null}
        {props.data.contact?.facebook && props.data.contact?.facebookUrl ? (
          <div className="flex gap-2 items-center">
            <FacebookSVG className="w-6 h-6" />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:underline"
              href={`${props.data?.contact?.facebookUrl}`}
            >
              {props.data?.contact?.facebook}
            </Link>
          </div>
        ) : null}
        {props.data.contact?.whatsapp ? (
          <div className="flex gap-2 items-center">
            <WhatsappSVG className="w-6 h-6" />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:underline"
              href={`https://web.whatsapp.com/send/?phone=%2B${props?.data?.contact?.whatsapp}&text=Hello%2C%20I%20would%20like%20to%20ask&type=phone_number&app_absent=0`}
            >
              {props.data?.contact?.whatsappName}
            </Link>
          </div>
        ) : null}
      </div>

      <p className="text-black">{props?.data?.description}</p>
    </div>
  );
};

export default TopBanner;
