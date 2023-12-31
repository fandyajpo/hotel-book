"use client";
import { client } from "@/lib/axios";
import { LocationT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useRouter } from "next/navigation";
import { OptionProps } from "react-select";

type ReserveFormT = {
  checkIn: string;
  checkOut: string;
  guest: number;
  location: OptionProps<string>;
};
const ReserveForm = () => {
  const { push } = useRouter();
  const { control, handleSubmit } = useForm<ReserveFormT>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data: ReserveFormT) => {
    return push(
      `/location/${data?.location?.value}?checkin=${data.checkIn}&checkout=${data.checkOut}&guest=${data.guest}&page=1`
    );
  });

  const searchLocation = async (q: string) => {
    try {
      const rr = await client.get(`api/location/search?search=${q}`, {
        method: "GET",
      });
      return rr?.data?.map?.((a: LocationT) => ({
        label: a?.name,
        value: a?.slug,
      }));
    } catch (err) {
      return null;
    }
  };

  const { data } = useQuery({
    queryKey: ["hotelLocations"],
    queryFn: () =>
      client.get(`api/location/search?search=`, {
        method: "GET",
      }),
  });

  return (
    <>
      <form
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl py-4"
        onSubmit={onSubmit}
      >
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          name="checkIn"
          render={({ field }) => (
            <div className="w-full bg-white border border-gray-400 shadow p-2 rounded-md">
              <label className=" sm:text-black">Check in</label>
              <input
                type="date"
                {...field}
                className="w-full p-2 rounded-md bg-gray-200"
                placeholder="Check in"
              />
            </div>
          )}
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          name="checkOut"
          render={({ field }) => (
            <div className="w-full bg-white border border-gray-400 shadow p-2 rounded-md">
              <label className=" sm:text-black">Check out</label>
              <input
                type="date"
                {...field}
                className="w-full p-2 rounded-md bg-gray-200"
                placeholder="Check out"
              />
            </div>
          )}
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          name="location"
          render={({ field }) => (
            <div className="w-full bg-white border border-gray-400 shadow p-2 rounded-md">
              <label className=" sm:text-black">Location</label>
              <AsyncSelect
                menuPortalTarget={
                  typeof document !== "undefined" &&
                  document.querySelector("body")
                }
                styles={{
                  control: (base, state) => ({
                    ...base,
                    background: "rgb(229, 231, 235)",

                    borderRadius: state?.isFocused ? 5 : 5,

                    borderColor: state?.isFocused
                      ? "rgb(107, 114, 128)"
                      : "rgb(107, 114, 128)",

                    boxShadow: state?.isFocused ? null : null,
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                }}
                isSearchable
                placeholder="Location"
                defaultOptions={data?.data?.map?.((a: LocationT) => ({
                  label: a?.name,
                  value: a?.slug,
                }))}
                cacheOptions
                loadOptions={searchLocation}
                {...field}
              />
            </div>
          )}
        />

        <Controller
          rules={{
            required: true,
          }}
          control={control}
          name="guest"
          render={({ field }) => (
            <div className="w-full bg-white border border-gray-400 shadow p-2 rounded-md">
              <label className=" sm:text-black">Guest</label>
              <input
                type="number"
                {...field}
                className="w-full p-2 rounded-md bg-gray-200"
                placeholder="Guest"
              />
            </div>
          )}
        />
        <div />
        <button
          type="submit"
          className="col-span-2 bg-green-500 text-white border border-white rounded-full py-2"
        >
          Find out!
        </button>
        <div />
      </form>
    </>
  );
};

export default ReserveForm;
