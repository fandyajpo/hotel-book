import { Params } from "@/types";
import RoomList from "@/components/Hotel/HotelList";
import Layer from "@/components/Layout/Layer";
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

  const result = await location.json();

  return (
    <>
      <div className="flex justify-center pb-44 ">
        <Layer isMiddle>
          <Back />
          <Banner text={`Hotels in ${result?.name}`} />
          <RoomList
            location={result}
            page={Number(props?.searchParams?.page)}
          />
        </Layer>
      </div>
    </>
  );
};

export default HotelSlug;
