import { Bath, Bed, Price } from "@/components/Icons";
import { RoomT } from "@/types";
import Link from "next/link";

interface Props {
  data: RoomT;
}

const RoomCard = (props: Props) => {
  return (
    <tr key={props?.data?._key} className="border">
      <td className="border py-2 px-4">{props?.data?.name}</td>
      <td className="border py-2 px-4 flex">
        <div className="flex flex-col gap-2 items-center">
          <Bath className="w-6 h-6" />
          {props?.data?.bath}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Bed className="w-6 h-6" />
          {props?.data?.bed}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Price className="w-6 h-6" />
          {props?.data?.price}
        </div>
      </td>
      <td className="border">
        <Link
          className="text-blue-500 p-2"
          href={`/bo/room/${props?.data?._key}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );
};

export default RoomCard;
