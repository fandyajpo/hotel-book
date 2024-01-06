import { hotelBySlug } from "@/query/hotel";
import { HotelT, Params } from "@/types";
import Banner from "@/components/Hotel/Banner";
import TopBanner from "@/components/Hotel/TopBanner";
import Layer from "@/components/Layout/Layer";
import Back from "@/components/Layout/Back";
const HotelSlug = async (
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
    <div className="flex justify-center pb-14 ">
      <Layer isMiddle>
        <Back title={hotel?.name} />
        <Banner text={`in ${hotel?.name}`} />

        <TopBanner data={hotel} />
      </Layer>
    </div>
  );
};

export default HotelSlug;
