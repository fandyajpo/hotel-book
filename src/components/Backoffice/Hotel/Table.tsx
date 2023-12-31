"use client";
import { client } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import HotelCard from "./Card";
import { HotelT } from "@/types";
import Paging from "@/components/Layout/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import SearchForm from "./SearchForm";
import { useDeferredValue } from "react";
import { LoadingSVG } from "@/components/Icons";
import { auth } from "@/lib/Firebase";
const HotelTable = () => {
  const { get } = useSearchParams();
  const deferQuery = useDeferredValue(get("q"));

  const { data, isLoading } = useQuery({
    queryKey: ["hotels", get("page")],
    queryFn: () =>
      client.get(`api/hotel?page=${get("page") || 1}&limit=9`, {
        method: "GET",
      }),
    enabled: !deferQuery,
  });

  const { data: search, isLoading: searchLoading } = useQuery({
    queryKey: ["hotelSearch", deferQuery],
    queryFn: () =>
      client.get(`api/hotel/search?search=${deferQuery}&status=DRAFT`, {
        method: "GET",
      }),

    enabled: deferQuery !== "" || deferQuery !== null,
  });

  return (
    <>
      <SearchForm total={data?.data?.total} />
      {isLoading || searchLoading ? (
        <div className="py-8">
          <LoadingSVG className="w-8 h-8 text-white" />
        </div>
      ) : null}
      <div className="grid grid-cols-3 gap-2">
        {!deferQuery
          ? data?.data?.data?.map?.((hotel: HotelT) => (
              <HotelCard {...hotel} key={hotel._key} />
            ))
          : search?.data?.map?.((hotel: HotelT) => (
              <HotelCard {...hotel} key={hotel._key} />
            ))}
      </div>
      <Paging
        total={Number(data?.data?.total)}
        currentPage={Number(get("page") || 1)}
        limit={10}
      />
    </>
  );
};

export default HotelTable;
