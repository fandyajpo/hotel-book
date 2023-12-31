"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import Paging from "@/components/Layout/Pagination";
import Header from "../Header";
import { useDeferredValue } from "react";

const BookingHotel = () => {
  const { get } = useSearchParams();
  const deferQuery = useDeferredValue(get("q"));

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", get("page"), deferQuery],
    queryFn: () =>
      client.get(`api/booking?page=${get("page") || 1}&limit=10`, {
        method: "GET",
      }),
    enabled: !deferQuery,
  });

  return (
    <div className="space-y-2">
      <Header title="Room List" total={data?.data?.total} />

      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* {isLoading ? (
        <div className="py-8">
          <LoadingSVG className="w-8 h-8" />
        </div>
      ) : !deferQuery ? (
        data?.data?.data?.map?.((a: RoomT) => (
          <RoomCard key={a._key} data={a} />
        ))
      ) : (
        search?.data?.map?.((a: RoomT) => <RoomCard key={a._key} data={a} />)
      )} */}

      <Paging
        total={Number(data?.data?.total)}
        currentPage={Number(get("page") || 1)}
        limit={10}
      />
    </div>
  );
};

export default BookingHotel;
