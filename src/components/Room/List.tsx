"use client";
import { client } from "@/lib/axios";
import { HotelT, RoomT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import RoomCard from "./Card";
import { useSearchParams } from "next/navigation";
import Paging from "../Layout/Pagination";
import { LoadingSVG } from "../Icons";
import Modal from "../Arch/Modal";
import SecureAlert from "./SecureAlert";
import Layer from "../Layout/Layer";
interface Props {
  hotel: HotelT;
}

const RoomList = (props: Props) => {
  const { get } = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["rooms", get("page")],
    queryFn: () =>
      client.get(
        `api/room?page=${get("page") || 1}&limit=10&hotel=${
          props?.hotel?._key
        }&status=DRAFT`,
        {
          params: {
            status: "DRAFT",
          },
          method: "GET",
        }
      ),
  });

  return (
    <div className="space-y-2">
      {isLoading ? (
        <LoadingSVG className="w-10 h-10" />
      ) : (
        data?.data?.data?.map?.((a: RoomT) => (
          <div key={a._key}>
            <Modal id={a._key}>
              <Layer>
                <SecureAlert room={a} />
              </Layer>
            </Modal>
            <RoomCard key={a._key} data={a} />
          </div>
        ))
      )}

      <Paging
        total={Number(data?.data?.total)}
        currentPage={Number(get("page") || 1)}
        limit={10}
      />
    </div>
  );
};

export default RoomList;
