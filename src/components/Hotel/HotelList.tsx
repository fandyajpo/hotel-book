"use client";
import { useSearchParams } from "next/navigation";
import RoomCard from "./Card";
import { HotelT, LocationT } from "@/types";
import Paging from "../Layout/Pagination";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { LoadingSVG } from "../Icons";
interface Props {
  location?: LocationT;
  page?: number;
}
const RoomList = (props: Props) => {
  const { get } = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["hotelByLocation", get("page")],
    queryFn: () =>
      client.get(
        `/api/hotel/location/${props.location?._key}?page=${
          get("page") || 1
        }&limit=10`,
        {
          method: "GET",
        }
      ),
  });

  return (
    <div className="w-full space-y-4">
      {isLoading ? (
        <div className="py-8">
          <LoadingSVG className="w-8 h-8" />
        </div>
      ) : (
        data?.data?.data?.map?.((a: HotelT) => (
          <RoomCard key={a?._key} hotel={a} />
        ))
      )}

      <Paging
        limit={10}
        total={data?.data?.total}
        key={"HOTEL_PAGING"}
        currentPage={Number(props?.page || 1)}
      />
    </div>
  );
};

export default RoomList;
