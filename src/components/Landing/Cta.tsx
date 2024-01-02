import Layer from "../Layout/Layer";
import Image from "next/image";
import CtaFirst from "../../../public/cta-first.jpeg";
import CtaSecond from "../../../public/cta-second.jpeg";
const Cta = () => {
  return (
    <div className="flex justify-center">
      <Layer isMiddle>
        <div className="mx-auto max-w-screen-2xl py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Image
                alt="CTA_FIRST"
                src={CtaFirst}
                className="h-40 w-full object-cover border rounded-xl sm:h-56 md:h-full"
              />

              <Image
                alt="CTA_SECOND"
                src={CtaSecond}
                className="h-40 w-full object-cover border rounded-xl sm:h-56 md:h-full"
              />
            </div>
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-black md:text-3xl">
                  Harmonious Haven: A Symphony of Nature{"'"}s Splendor
                </h2>

                <p className="hidden text-black sm:mt-4 sm:block">
                  In the realm of scenic wonders, immerse yourself in the
                  captivating allure of a harmonious haven—a symphony
                  orchestrated by nature{"'"}s hand. As the sun gracefully
                  paints the canvas of the sky with hues ranging from the soft
                  blush of dawn to the fiery embrace of sunset, the landscape
                  unfolds like a poetic masterpiece.
                </p>

                <div className="mt-4 md:mt-8">
                  <a
                    href="#"
                    className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Get Started Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layer>
    </div>
  );
};

export default Cta;
