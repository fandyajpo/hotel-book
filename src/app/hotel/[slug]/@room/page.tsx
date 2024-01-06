import { hotelBySlug } from "@/query/hotel";
import { HotelT, Params } from "@/types";
import RoomList from "@/components/Room/List";
import Layer from "@/components/Layout/Layer";
import SummaryBanner from "@/components/Hotel/SummaryBanner";
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
  const hotel: HotelT = await hotelBySlug(props.params.slug);
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
