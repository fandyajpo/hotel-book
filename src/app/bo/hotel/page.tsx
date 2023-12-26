export const dynamic = "force-dynamic";
import HotelHeader from "@/components/Backoffice/Hotel/Header";
import HotelTable from "@/components/Backoffice/Hotel/Table";
const BOHotel = async () => {
  return (
    <>
      <HotelHeader />
      <HotelTable />
    </>
  );
};

export default BOHotel;
