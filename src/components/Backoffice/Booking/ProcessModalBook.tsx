"use client";

import { documentById } from "@/lib/listFunc";
import { BookingT } from "@/types";
import BookDelete from "./Delete";
import { currencyFormator } from "@/lib/currencyFormat";
interface Props {
  book: BookingT;
}

const ProcessModalBook = (props: Props) => {
  return (
    <div className="p-4">
      <div className="pb-4 flex justify-end">
        <button
          className="text-red-500"
          onClick={() => documentById(props?.book?._key as string)?.close?.()}
        >
          Close
        </button>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Username</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props?.book?.username}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Email</dt>
          <dd className="text-gray-700 sm:col-span-2">{props?.book?.email}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Phone</dt>
          <dd className="text-gray-700 sm:col-span-2">{props?.book?.phone}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Guest</dt>
          <dd className="text-gray-700 sm:col-span-2">{props?.book?.guest}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Check In</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props?.book?.checkIn}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Check Out</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props?.book?.checkOut}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Accept Currency</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props?.book?.currency}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Amount</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props.book.amount && props.book.currency
              ? currencyFormator({
                  style: "currency",
                  currency: props?.book.currency,
                })?.format?.(props?.book?.amount)
              : null}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Hotel Name</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props?.book?.hotel?.name}
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Room Choosen</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {props?.book?.room?.name}
          </dd>
        </div>
      </dl>

      <BookDelete data={props.book} />
    </div>
  );
};

export default ProcessModalBook;
