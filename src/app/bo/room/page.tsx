export const dynamic = "force-dynamic";
import RoomHeader from "@/components/Backoffice/Room/Header";
import RoomTable from "@/components/Backoffice/Room/Table";
const BORoom = async () => {
  return (
    <>
      <RoomHeader />
      <RoomTable />
    </>
  );
};

export default BORoom;
