"use client";
import { RoomT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useSearchParams, useParams } from "next/navigation";
import Paging from "@/components/Layout/Pagination";
import Header from "../Header";
import { useDeferredValue } from "react";
import RoomCard from "./Card";
import { LoadingSVG } from "@/components/Icons";

const RoomTable = () => {
  const { get } = useSearchParams();
  const deferQuery = useDeferredValue(get("q"));
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["rooms", get("page"), deferQuery],
    queryFn: () =>
      client.get(
        `api/room?page=${get("page") || 1}&limit=10&hotel=${params?.key}`,
        {
          method: "GET",
        }
      ),
    enabled: !deferQuery,
  });

  const { data: search } = useQuery({
    queryKey: ["roomSearch", deferQuery],
    queryFn: () =>
      client.get(`api/category/search?search=${deferQuery}`, {
        method: "GET",
      }),

    enabled: deferQuery !== "" || deferQuery !== null,
  });

  return (
    <div className="space-y-2">
      <Header title="Room List" total={data?.data?.total} />

      {isLoading ? (
        <div className="py-8">
          <LoadingSVG className="w-8 h-8" />
        </div>
      ) : (
        <table className="table-auto border w-full">
          <thead>
            <tr className="border">
              <th className="border">Name</th>
            </tr>
          </thead>
          <tbody>
            {!deferQuery
              ? data?.data?.data?.map?.((a: RoomT) => (
                  <RoomCard key={a._key} data={a} />
                ))
              : search?.data?.map?.((a: RoomT) => (
                  <RoomCard key={a._key} data={a} />
                ))}
          </tbody>
        </table>
      )}

      <Paging
        total={Number(data?.data?.total)}
        currentPage={Number(get("page") || 1)}
        limit={10}
      />
    </div>
  );
};

export default RoomTable;
