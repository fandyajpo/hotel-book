"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import Paging from "@/components/Layout/Pagination";
import Header from "../Header";
import { useDeferredValue } from "react";
import { BookingT } from "@/types";

const BookingHotel = () => {
  const { get } = useSearchParams();
  const deferQuery = useDeferredValue(get("q"));
  const { data } = useQuery({
    queryKey: ["bookings", get("page"), deferQuery],
    queryFn: () =>
      client.get(`api/booking?page=${get("page") || 1}&limit=10`, {
        method: "GET",
      }),
    enabled: !deferQuery,
  });

  return (
    <div className="space-y-2">
      <Header title="Booking List" total={data?.data?.total} />

      <table className="table-auto border w-full">
        <thead>
          <tr className="border">
            <th className="border">Room Name</th>
            <th className="border">Hotel Name</th>
            <th className="border">Booking Date</th>
            <th className="border">Guest</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.map?.((a: BookingT) => (
            <tr key={a?._key} className="border">
              <td className="border">
                <p className="p-2">{a?.room?.name}</p>
              </td>
              <td className="border">
                <p className="p-2">{a?.room?.hotel?.name}</p>
              </td>
              <td className="border">
                <div className="p-2 text-sm">
                  <p>Check in : {a?.checkIn}</p>
                  <p>Check out : {a?.checkOut}</p>
                </div>
              </td>
              <td className="border">
                <p className="p-2">{a?.guest}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paging
        total={Number(data?.data?.total)}
        currentPage={Number(get("page") || 1)}
        limit={10}
      />
    </div>
  );
};

export default BookingHotel;
