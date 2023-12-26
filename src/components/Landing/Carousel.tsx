"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        <div className="embla__slide bg-blue-500 min-h-screen">Slide 1</div>
        <div className="embla__slide bg-red-500 min-h-screen">Slide 2</div>
        <div className="embla__slide bg-yellow-500 min-h-screen">Slide 3</div>
      </div>
    </div>
  );
};

export default Carousel;
