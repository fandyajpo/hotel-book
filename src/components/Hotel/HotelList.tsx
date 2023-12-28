import { hotelByLocation } from "@/query/hotel";
import RoomCard from "./Card";
import { HotelT, LocationT } from "@/types";
import Paging from "../Layout/Pagination";
interface Props {
  location?: LocationT;
  page?: number;
}
const RoomList = async (props: Props) => {
  const hotel = await hotelByLocation(
    Number(props?.page),
    10,
    props?.location?._key as string
  );
  return (
    <div className="w-full space-y-4">
      {hotel?.data?.map?.((a: HotelT) => (
        <RoomCard key={a?._key} hotel={a} />
      ))}

      <Paging
        limit={10}
        total={hotel?.total}
        key={"HOTEL_PAGING"}
        currentPage={Number(props?.page)}
      />
    </div>
  );
};

export default RoomList;
