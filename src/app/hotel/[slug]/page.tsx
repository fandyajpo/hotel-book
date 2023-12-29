import { hotelBySlug } from "@/query/hotel";
import { HotelT, Params } from "@/types";
import Loading from "./loading";
import Banner from "@/components/Hotel/Banner";
import { Suspense } from "react";
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

      {/*  
      <div className="flex justify-center pb-44 ">
        <Layer isMiddle>
          <Suspense fallback={<Loading />}>
            <RoomList location={location} />
          </Suspense>
        </Layer>
      </div> */}
    </>
  );
};

export default HotelSlug;
