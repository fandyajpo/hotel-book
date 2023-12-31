import { RoomT, StatusT } from "@/types";
import { currencyFormator } from "./currencyFormat";
import { documentById } from "./listFunc";

interface Props {
  status: StatusT;
}
const CardStatus = (props: Props) => {
  return (
    <div
      className={`rotate-180 p-2 [writing-mode:_vertical-lr] ${
        props.status === "BOOKED"
          ? "bg-yellow-500 text-white"
          : props.status === "AVAILABLE"
          ? "bg-green-500 text-white"
          : props.status === "DRAFT"
          ? "bg-gray-200"
          : null
      }`}
    >
      <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase">
        <span>-</span>
        <span>{props.status}</span>
        <span>-</span>
      </div>
    </div>
  );
};

interface SecondProps {
  data: RoomT;
}

export const CardCheckoutStatus = (props: SecondProps) => {
  return (
    <>
      {props.data.status === "BOOKED" ? (
        <>
          <div className="sm:flex sm:items-end sm:justify-end">
            <div className="block  px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition"></div>
          </div>
          <div className="sm:flex sm:items-end sm:justify-end"></div>
        </>
      ) : (
        <>
          <div className="sm:flex sm:items-end sm:justify-end">
            <div className="block  px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition">
              {props.data.price && props.data.hotel?.currency
                ? currencyFormator({
                    style: "currency",
                    currency: props?.data?.hotel?.currency,
                  })?.format?.(props?.data?.price)
                : null}
            </div>
          </div>
          <div className="sm:flex sm:items-end sm:justify-end">
            <button
              onClick={() =>
                documentById(props?.data?._key as string)?.showModal?.()
              }
              className="block bg-green-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-green-400"
            >
              Secure Yours Now{" "}
            </button>
          </div>{" "}
        </>
      )}
    </>
  );
};

export const HotelStatus = (props: Props) => (
  <div
    className={`w-fit p-1 rounded ${
      props.status === "BOOKED"
        ? "bg-yellow-500 text-white"
        : props.status === "AVAILABLE"
        ? "bg-green-500 text-white"
        : props.status === "DRAFT"
        ? "bg-gray-200"
        : null
    }`}
  >
    {props.status}
  </div>
);

export default CardStatus;
