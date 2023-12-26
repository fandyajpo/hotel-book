import Layer from "../Layout/Layer";
import RoomCard from "../Hotel/Card";

const ListRoom = () => {
  return (
    <div className="flex justify-center items-center w-full h-full py-12">
      <Layer>
        <div className="space-y-4">
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
      </Layer>
    </div>
  );
};

export default ListRoom;
