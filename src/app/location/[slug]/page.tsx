export const dynamic = "force-dynamic";
import { locationBySlug } from "@/query/location";
import { LocationT, Params } from "@/types";
import Loading from "./loading";
import RoomList from "@/components/Hotel/HotelList";
import Layer from "@/components/Layout/Layer";
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
  const location: LocationT = await locationBySlug?.(props?.params?.slug);

  return (
    <>
      <Banner text={`Hotels in ${location?.name}`} />
      <div className="flex justify-center pb-44 ">
        <Suspense fallback={<Loading />}>
          <Layer isMiddle>
            <RoomList
              location={location}
              page={Number(props?.searchParams?.page)}
            />
          </Layer>
        </Suspense>
      </div>
    </>
  );
};

export default HotelSlug;
