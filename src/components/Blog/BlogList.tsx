"use client";
import { client } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import HotelCard from "./Card";
import { BlogT, HotelT } from "@/types";
import Paging from "@/components/Layout/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import SearchForm from "./SearchForm";
import { useDeferredValue } from "react";
import { LoadingSVG } from "@/components/Icons";
const BlogList = () => {
  const { get } = useSearchParams();
  const deferQuery = useDeferredValue(get("q"));

  const { data, isLoading } = useQuery({
    queryKey: ["blogPage", get("page")],
    queryFn: () =>
      client.get(`api/blog?page=${get("page") || 1}&limit=9`, {
        method: "GET",
      }),
    enabled: !deferQuery,
  });

  const { data: search, isLoading: searchLoading } = useQuery({
    queryKey: ["blogPageSearch", deferQuery],
    queryFn: () =>
      client.get(`api/blog/search?search=${deferQuery}`, {
        method: "GET",
      }),

    enabled: deferQuery !== "" || deferQuery !== null,
  });

  return (
    <>
      <SearchForm />
      {isLoading || searchLoading ? (
        <div className="py-8">
          <LoadingSVG className="w-8 h-8 text-white" />
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  w-full gap-2">
        {!deferQuery
          ? data?.data?.data?.map?.((bl: BlogT) => (
              <HotelCard {...bl} key={bl._key} />
            ))
          : search?.data?.map?.((bl: BlogT) => (
              <HotelCard {...bl} key={bl._key} />
            ))}
      </div>
      {deferQuery ? null : (
        <Paging
          total={Number(data?.data?.total)}
          currentPage={Number(get("page") || 1)}
          limit={10}
        />
      )}
    </>
  );
};

export default BlogList;
