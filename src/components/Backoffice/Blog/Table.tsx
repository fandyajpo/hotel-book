"use client";
import Link from "next/link";
import Modal from "@/components/Arch/Modal";
import { documentById } from "@/lib/listFunc";
import { BlogT } from "@/types";
import CategoryForm from "@/components/Backoffice/Category/Form";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import Paging from "@/components/Layout/Pagination";
import Header from "../Header";
import SearchForm from "./SearchForm";
import { useDeferredValue } from "react";
import { LoadingSVG } from "@/components/Icons";
const BlogTable = () => {
  const { get } = useSearchParams();
  const deferQuery = useDeferredValue(get("q"));

  const action = (data: BlogT) => {
    documentById(data?._key as string)?.showModal?.();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", get("page"), deferQuery],
    queryFn: () =>
      client.get(`api/blog?page=${get("page") || 1}&limit=10`, {
        method: "GET",
      }),
    enabled: !deferQuery,
  });

  const { data: search, isLoading: searchLoading } = useQuery({
    queryKey: ["blogSearch", deferQuery],
    queryFn: () =>
      client.get(`api/blog/search?search=${deferQuery}`, {
        method: "GET",
      }),
    enabled: deferQuery !== "" || deferQuery !== null,
  });

  return (
    <div className="space-y-2">
      <Header title="Category List" total={data?.data?.total} />
      <SearchForm />
      {isLoading || searchLoading ? (
        <div className="py-8">
          <LoadingSVG className="w-8 h-8 text-white" />
        </div>
      ) : (
        <table className="table-auto border w-full bg-white/90">
          <thead>
            <tr className="border">
              <th className="border">Name</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {!deferQuery ? (
              <>
                {data?.data?.data?.map?.((a: BlogT) => (
                  <tr key={a?._key} className="border">
                    <td className="border py-2 px-4">
                      {a?.title ? a?.title : a?.slug}
                    </td>
                    <td className="border">
                      <Link
                        className="text-black p-2"
                        href={`/bo/blog/${a._key}`}
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
                ))}
              </>
            ) : (
              <>
                {search?.data?.map?.((a: BlogT) => (
                  <tr key={a._key} className="border">
                    <td className="border py-2 px-4">{a.slug}</td>
                    <td className="border">
                      <button
                        className="text-black p-2"
                        onClick={() => action(a)}
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
                      </button>
                      <Modal id={a._key}>
                        <CategoryForm data={a} method="UPDATE" />
                      </Modal>
                    </td>
                  </tr>
                ))}
              </>
            )}
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

export default BlogTable;
