import Link from "next/link";
const RoomHeader = () => {
  return (
    <div className="h-14 bg-blue-500 w-full flex justify-between px-6 items-center">
      <p className="text-white">Rooms</p>
      <Link
        href={"/bo/room/new"}
        className="text-blue-500 bg-white h-8 w-32 flex items-center justify-center"
      >
        Create New
      </Link>
    </div>
  );
};

export default RoomHeader;
