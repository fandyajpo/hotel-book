export const dynamic = "force-dynamic";
import RoomHeader from "@/components/Backoffice/Room/Header";
import RoomTable from "@/components/Backoffice/Room/Table";
import { Params } from "@/types";
const BORoom = (
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
      <RoomHeader url={`/bo/hotel/${props.params?.key}/room/new`} />
      <RoomTable />
    </>
  );
};

export default BORoom;
