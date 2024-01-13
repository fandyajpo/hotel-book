import { HotelT, SlugMeta } from "@/types";
import Link from "next/link";
import { hotelBySlug } from "@/query/hotel";
import { Metadata, ResolvingMetadata } from "next/types";
import Modal from "@/components/Arch/Modal";
import { Suspense } from "react";
import Loading from "./loading";
interface Props {
  children: React.ReactNode;
  hotel: React.ReactNode;
  room: React.ReactNode;
}

export async function generateMetadata(
  { params }: SlugMeta,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const hotel: HotelT = await hotelBySlug(params?.slug as string);

  return {
    title: hotel?.name || "Hotel",
    description: hotel.description || "No Description",
    openGraph: {
      title: hotel?.name || "Hotel",
      description: hotel.description || "No Description",
    },
    twitter: {
      title: hotel?.name || "Hotel",
      description: hotel.description || "No Description",
    },
  };
}

const Layout = (props: Props) => {
  return (
    <>
      <Modal id="congrats">
        <div className="flex flex-col justify-center items-center p-8 gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </svg>

          <p>
            Congratulations! Your hotel booking is now being processed by our
            admin team
          </p>
          <Link href="/" className="py-1 px-4 bg-blue-500 rounded text-white">
            Home
          </Link>
        </div>
      </Modal>
      <Suspense fallback={<Loading />}>{props.hotel}</Suspense>
      {props.children}
      <Suspense fallback={<Loading />}>{props.room}</Suspense>
    </>
  );
};

export default Layout;
