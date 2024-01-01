import { Bath, Bed, Price } from "@/components/Icons";
import { RoomT, StatusT } from "@/types";
import Link from "next/link";
import ImageLoader from "@/components/Layout/ImageLoader";
import CardStatus from "@/lib/cardStatus";

interface Props {
  data: RoomT;
}

const RoomCard = (props: Props) => {
  return (
    <div className="flex bg-white w-full transition hover:shadow border">
      <CardStatus status={props?.data?.status as StatusT} />

      <div className="w-full basis-44">
        <div className="aspect-square h-full w-full object-cover">
          <ImageLoader imageSource={""} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900">
              {props?.data.name}
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

                <p className="font-medium">{props.data.bath}</p>
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

                <p className="font-medium">{props.data.bed}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            href={`/bo/hotel/${props.data?.hotel?._key}/room/${props.data?._key}`}
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
