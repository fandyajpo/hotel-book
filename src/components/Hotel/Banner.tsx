import { LocationT } from "@/types";

interface Props {
  location: LocationT;
}

const Banner = (props: Props) => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-96 lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Discover the best.
            <strong className="font-extrabold text-blue-700 sm:block">
              {" "}
              hotels in {props.location.name}.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Explore luxury with our curated selection of premier hotels, where
            personalized service and opulent amenities redefine hospitality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
