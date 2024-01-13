import { hotelBySlug } from "@/query/hotel";
import { HotelT, Params } from "@/types";
import RoomList from "@/components/Room/List";
import Layer from "@/components/Layout/Layer";
import SummaryBanner from "@/components/Hotel/SummaryBanner";
import { unstable_cache } from "next/cache";

const getCachedHotel = unstable_cache(
  async (name) => hotelBySlug(name),
  ["my-app-hotel"]
);

const Room = async (
  props: Params<{
    params: {
      [code: string]: string;
    };
    searchParams: {
      [code: string]: string;
    };
  }>
) => {
  const hotel: HotelT = await getCachedHotel(props?.params?.slug);
  return (
    <div className="flex justify-center pb-44 ">
      <Layer isMiddle>
        <SummaryBanner data={hotel} />
        <RoomList hotel={hotel} />
      </Layer>
    </div>
  );
};

export default Room;
