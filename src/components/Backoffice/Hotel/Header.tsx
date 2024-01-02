import Link from "next/link";
const HotelHeader = () => {
  return (
    <div className="h-14 bg-white/90 w-full flex justify-between px-6 items-center">
      <p className="text-black">Hotels</p>
      <Link
        href={"/bo/hotel/new"}
        className="text-white bg-blue-500 h-8 w-32 flex items-center justify-center"
      >
        Create New
      </Link>
    </div>
  );
};

export default HotelHeader;
