"use client";
import { BookingT, RoomT } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams, usePathname } from "next/navigation";
import { documentById } from "@/lib/listFunc";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { LoadingSVG } from "../Icons";
import TopBanner from "./TopBanner";
import { ImageKitFileT } from "@/lib/imageKit";
interface Props {
  room: RoomT;
}

const SecureAlert = (props: Props) => {
  const pathname = usePathname();
  const { get } = useSearchParams();
  const { control, handleSubmit } = useForm<BookingT>({
    defaultValues: {
      checkIn: String(get("checkin")),
      checkOut: String(get("checkout")),
      guest: get("guest") as any,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: BookingT) =>
      client.post("api/booking", {
        ...data,
        // @ts-ignore
        checkIn: new Date(data?.checkIn).toISOString(),
        // @ts-ignore
        checkOut: new Date(data?.checkOut).toISOString(),
        room: props?.room?._key,
        guest: Number(data.guest),
        hotel: props?.room?.hotel?._key,
        amount: props?.room?.price,
        transactionUrl: pathname,
        currency: props?.room?.hotel?.currency,
      } as BookingT),
    mutationKey: ["createBooking"],
    onSuccess: () => documentById("congrats")?.showModal?.(),
  });

  const onSubmit = handleSubmit(async (data: BookingT) => {
    await mutateAsync(data);
    return documentById(props?.room?._key as string)?.close?.();
  });

  return (
    <div className="p-4 w-full flex-none">
      <form className="flex flex-col w-full space-y-2" onSubmit={onSubmit}>
        <p className="font-semibold">{props?.room?.name}</p>
        {/* <TopBanner data={props.room} /> */}
        <p>{props?.room?.description}</p>
        <p className="font-semibold text-xl underline">Booking Room Form</p>
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <label className="text-white sm:text-black">Username</label>
              <input
                placeholder="Username"
                className="w-full p-2 rounded-md"
                type="text"
                {...field}
              />
            </div>
          )}
          name="username"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <label className="text-white sm:text-black">Check in</label>
              <input
                placeholder="Checkin"
                className="w-full p-2 rounded-md"
                type="date"
                {...field}
              />
            </div>
          )}
          name="checkIn"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <label className="text-white sm:text-black">Check out</label>
              <input
                placeholder="Checkout"
                className="w-full p-2 rounded-md"
                type="date"
                {...field}
              />
            </div>
          )}
          name="checkOut"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <label className="text-white sm:text-black">Guest</label>
              <input
                placeholder="Guest"
                className="w-full p-2 rounded-md"
                type="number"
                {...field}
              />
            </div>
          )}
          name="guest"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <label className="text-white sm:text-black">Email</label>
              <input
                placeholder="Email"
                className="w-full p-2 rounded-md"
                type="email"
                {...field}
              />
            </div>
          )}
          name="email"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <label className="text-white sm:text-black">Phone</label>
              <input
                placeholder="Example 62+8"
                className="w-full p-2 rounded-md"
                type="text"
                {...field}
              />
            </div>
          )}
          name="phone"
        />
        <div className="flex w-full pt-4">
          {isPending ? null : (
            <button
              className="w-full text-red-500 p-1"
              type="button"
              onClick={() =>
                documentById(props?.room?._key as string)?.close?.()
              }
            >
              Cancel
            </button>
          )}
          <button
            disabled={isPending}
            className="bg-blue-500 p-1 text-white w-full rounded"
            type="submit"
          >
            {isPending ? <LoadingSVG className="w-6 h-6" /> : "Book Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecureAlert;
