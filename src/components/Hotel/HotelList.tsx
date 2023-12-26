import { hotelByLocation } from "@/query/hotel";
import RoomCard from "./Card";
import { HotelT, LocationT } from "@/types";
interface Props {
  location?: LocationT;
}
const RoomList = async (props: Props) => {
  const hotel: HotelT[] = await hotelByLocation(
    props?.location?._key as string
  );
  return (
    <div className="w-full space-y-4">
      {hotel?.map?.((a) => (
        <RoomCard key={a._key} hotel={a} />
      ))}
    </div>
  );
};

export default RoomList;
