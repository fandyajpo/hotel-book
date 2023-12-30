import { hotelBySlug } from "@/query/hotel";
import { HotelT, Params } from "@/types";
import Banner from "@/components/Hotel/Banner";
import TopBanner from "@/components/Hotel/TopBanner";
import Layer from "@/components/Layout/Layer";
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
    <>
      <Banner text={`in ${hotel?.name}`} />
      <div className="flex justify-center pb-44 ">
        <Layer isMiddle>
          <TopBanner image="" />
          <pre>{JSON.stringify(hotel, null, 2)}</pre>
        </Layer>
      </div>
    </>
  );
};

export default HotelSlug;
