"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import Paging from "@/components/Layout/Pagination";
import Header from "../Header";
import { BookingT, StatusT } from "@/types";
import Modal from "@/components/Arch/Modal";
import ProcessModalBook from "./ProcessModalBook";
import { documentById } from "@/lib/listFunc";
import DateFilter from "./DateFilter";
import Link from "next/link";
import { HotelStatus } from "@/lib/cardStatus";
const BookingHotel = () => {
  const { get } = useSearchParams();
  const { data } = useQuery({
    queryKey: ["bookings", get("page"), get("checkIn"), get("checkOut")],
    queryFn: () =>
      client.get(
        `api/booking?page=${get("page") || 1}&limit=10&checkIn=${get(
          "checkIn"
        )}&checkOut=${get("checkOut")}`,
        {
          method: "GET",
        }
      ),
  });

  return (
    <div className="space-y-2">
      <Header title="Booking List" total={data?.data?.total} />
      <DateFilter />
      <table className="table-auto border w-full bg-white/50">
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
            <>
              <Modal id={a?._key}>
                <ProcessModalBook book={a} />
              </Modal>
              <tr key={a?._key} className="border">
                <td className="border">
                  <div className="flex items-center justify-between p-2">
                    <p className="p-2">{a?.room?.name}</p>
                    <Link
                      href={`/bo/hotel/${a.hotel?._key}/room/${a?.room?._key}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
                <td className="border">
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <p className="p-2">{a?.hotel?.name}</p>
                      <HotelStatus status={a?.hotel?.status as StatusT} />
                    </div>
                    <Link href={`/bo/hotel/${a?.hotel?._key}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </Link>
                  </div>
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
                <td className="p-2">
                  <button
                    onClick={() =>
                      documentById(a?._key as string)?.showModal?.()
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </>
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
