"use client";
import Image from "next/image";
import Fuji from "../../../public/landing.jpg";
import Layer from "../Layout/Layer";
import { ArrowDown } from "../Icons";
import ReserveForm from "./ReserveForm";

const Background = () => {
  return (
    <div className="w-full h-screen sm:h-96 relative bg-black overflow-hidden">
      <Image src={Fuji} alt="fuji" fill className="object-cover" />
      <div className="bg-gradient-to-t from-white to-transparent hidden sm:block absolute w-full h-full"></div>
      <div className="absolute flex justify-center items-center w-full h-full">
        <Layer isMiddle>
          <div>
            <p className="text-white drop-shadow-sm text-3xl font-bold">
              The Most Luxurious
            </p>
            <p className="text-white drop-shadow-sm text-3xl font-bold">
              Hotel In-Town!
            </p>
          </div>
          <hr className="my-2 border-white" />
          <div className="py-2" />
          <ReserveForm />
        </Layer>
        <div className="absolute bottom-4 space-y-2">
          <div className="flex justify-center">
            <ArrowDown className="text-white sm:text-black w-10 h-10  animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Background;
