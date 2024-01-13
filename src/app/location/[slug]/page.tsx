import { Params } from "@/types";
import RoomList from "@/components/Hotel/HotelList";
import Banner from "@/components/Hotel/Banner";
import Back from "@/components/Layout/Back";
import { locationById } from "@/server/location";
import { unstable_cache } from "next/cache";

const getCachedLocation = unstable_cache(
  async (name) => locationById(name),
  ["my-app-location"]
);

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
  const location = await getCachedLocation(props.params?.slug);

  return (
    <>
      <Back title={location?.name} />
      <Banner text={`Hotels in ${location?.name}`} />
      <RoomList location={location} page={Number(props?.searchParams?.page)} />
    </>
  );
};

export default HotelSlug;
