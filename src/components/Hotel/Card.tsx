"use client";
import { HotelT } from "@/types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ImageLoader from "../Layout/ImageLoader";
interface Props {
  hotel: HotelT;
}

const HotelCard = (props: Props) => {
  const { get } = useSearchParams();

  return (
    <div className="flex bg-white w-full transition hover:shadow border">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
          <span>-</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>-</span>
        </div>
      </div>

      <div className="w-full basis-44">
        <div className="aspect-square h-full w-full object-cover">
          <ImageLoader imageSource={props?.hotel?.image?.[0]?.url as any} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900">
              {props?.hotel?.name}
            </h3>
          </a>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="h-4 w-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Bathroom</p>

                <p className="font-medium">2 rooms</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="h-4 w-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Bedroom</p>

                <p className="font-medium">4 rooms</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            href={`/hotel/${[props?.hotel?.slug]}?config${
              !get("checkin") ? "" : "&checkin=" + get("checkin")
            }${!get("checkout") ? "" : "&checkout=" + get("checkout")}${
              !get("guest") ? "" : "&guest=" + get("guest")
            }`}
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
          >
            Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
