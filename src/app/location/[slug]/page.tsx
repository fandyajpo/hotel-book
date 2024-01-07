export const runtime = "edge";
import { LocationT, Params } from "@/types";
import RoomList from "@/components/Hotel/HotelList";
import Banner from "@/components/Hotel/Banner";
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
  const location = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/location/search/${props?.params?.slug}`,
    {
      method: "GET",
    }
  );

  const result: LocationT = await location?.json();

  return (
    <>
      <Back title={result?.name} />
      <Banner text={`Hotels in ${result?.name}`} />
      <RoomList location={result} page={Number(props?.searchParams?.page)} />
    </>
  );
};

export default HotelSlug;
