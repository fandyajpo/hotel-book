import { HotelT } from "@/types";

interface Props {
  data: HotelT;
}
const SummaryBanner = (props: Props) => {
  return (
    <div className="w-full h-24  flex items-center justify-evenly">
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <svg
          className="h-4 w-4 text-indigo-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>

        <div className="mt-1.5 sm:mt-0">
          <p className="text-gray-500">Bathroom</p>

          <p className="font-medium">
            {props.data.summary?.minBath === props.data.summary?.maxBath
              ? props.data.summary?.minBath || ""
              : `${props.data.summary?.minBath || ""} - ${
                  props.data.summary?.maxBath || ""
                }`}
          </p>
        </div>
      </div>
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <svg
          className="h-4 w-4 text-indigo-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        <div className="mt-1.5 sm:mt-0">
          <p className="text-gray-500">Bedroom</p>

          <p className="font-medium">
            {props.data.summary?.minBed === props.data.summary?.maxBed
              ? props.data.summary?.minBed || ""
              : `${props.data.summary?.minBed || ""} - ${
                  props.data.summary?.maxBed || ""
                }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
