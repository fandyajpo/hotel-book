"use client";
import { RoomT, SecureFormT } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { documentById } from "@/lib/listFunc";
interface Props {
  room: RoomT;
}

const SecureAlert = (props: Props) => {
  const { get } = useSearchParams();
  const { control } = useForm<SecureFormT>({
    defaultValues: {
      checkIn: String(get("checkin")),
      checkOut: String(get("checkout")),
      guest: get("guest") as any,
    },
  });

  return (
    <div className="p-4">
      <form className="flex flex-col w-full space-y-2">
        <p>{props.room.name}</p>
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
          <button
            className="w-full text-red-500 p-1"
            type="button"
            onClick={() => documentById(props?.room?._key as string)?.close?.()}
          >
            Cancel
          </button>
          <button className="bg-blue-500 p-1 w-full rounded" type="button">
            Secure Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecureAlert;
