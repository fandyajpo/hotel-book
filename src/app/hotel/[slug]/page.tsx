import { HotelT, Params } from "@/types";

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
  return (
    <>
      <hr className="shadow" />
    </>
  );
};

export default HotelSlug;
