import Link from "next/link";
const HotelHeader = () => {
  return (
    <div className="h-14 bg-blue-500 w-full flex justify-between px-6 items-center">
      <p className="text-white">Hotels</p>
      <Link
        href={"/bo/hotel/new"}
        className="text-blue-500 bg-white h-8 w-32 flex items-center justify-center"
      >
        Create New
      </Link>
    </div>
  );
};

export default HotelHeader;
