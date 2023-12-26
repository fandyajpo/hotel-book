"use client";
import { client } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { CategoryT, StatusT, HotelT, CurrencyT, LocationT } from "@/types";
import HotelDelete from "./Delete";
import withData from "@/components/Hoc/withData";
import HotelMedia from "./Media";
import Title from "../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import AsyncSelect from "react-select/async";
import { LoadingSVG } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { slug } from "@/lib/listFunc";

const HOTEL_STATUS: Array<StatusT> = ["DRAFT", "AVAILABLE"];
const HOTEL_CURRENCY: Array<CurrencyT> = [
  "AUD",
  "EUR",
  "GBP",
  "IDR",
  "SGD",
  "THB",
  "USD",
];

type Option = {
  method?: "UPDATE" | "CREATE";
  data?: HotelT;
};

const HotelForm = (props?: Option) => {
  const { replace } = useRouter();
  const { control, handleSubmit } = useForm<HotelT>({
    mode: "all",
    defaultValues:
      props?.method === "UPDATE"
        ? {
            ...props?.data,
            category: {
              // @ts-ignore
              value: props?.data?.category?._key,
              label: props?.data?.category?.name,
            },
            location: {
              // @ts-ignore
              value: props?.data?.location?._key,
              label: props?.data?.location?.name,
            },
          }
        : { ...props?.data },
  });

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationKey: ["createHotel"],
    mutationFn: (data: HotelT) =>
      client.post(
        "/api/hotel",
        {
          ...data,
          // @ts-ignore
          category: data?.category?.value,
          // @ts-ignore
          location: data?.location?.value,
          slug: slug(data?.name),
        } as HotelT,
        { method: "POST" }
      ),
    onSuccess: () => replace("/bo/hotel"),
  });

  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateHotel"],
    mutationFn: (data: HotelT) =>
      client.patch(
        `/api/hotel/${data?._key}`,
        {
          ...data,
          // @ts-ignore
          category: data?.category?.value,
          // @ts-ignore
          location: data?.location?.value,
          slug: slug(data?.name),
        } as HotelT,
        {
          method: "PATCH",
        }
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["hotel"] }),
  });

  const { data } = useQuery({
    queryKey: ["hotelCategory"],
    queryFn: () =>
      client.get(`/api/category/search?search=`, {
        method: "GET",
      }),
  });

  const { data: location } = useQuery({
    queryKey: ["hotelLocation"],
    queryFn: () =>
      client.get(`/api/location/search?search=`, {
        method: "GET",
      }),
  });

  const searchCategory = async (q: string) => {
    try {
      const rr = await client.get(`/api/category/search?search=${q}`, {
        method: "GET",
      });
      return rr?.data?.map?.((a: CategoryT) => ({
        label: a?.name,
        value: a?._key,
      }));
    } catch (err) {
      return null;
    }
  };

  const searchLocation = async (q: string) => {
    try {
      const rr = await client.get(`/api/location/search?search=${q}`, {
        method: "GET",
      });
      return rr?.data?.map?.((a: LocationT) => ({
        label: a?.name,
        value: a?._key,
      }));
    } catch (err) {
      return null;
    }
  };

  const submit = handleSubmit((data: HotelT) => {
    // return console.log(data);
    props?.method === "CREATE" ? create(data) : update(data);
  });

  return (
    <div className="space-y-4">
      {props?.method === "UPDATE" ? (
        <HotelMedia media={props?.data?.image} />
      ) : null}

      <form
        onSubmit={submit}
        className="border rounded border-gray-300 p-4 space-y-2"
      >
        <Title title="Hotel Profile" />
        {props?.data?.slug ? (
          <p className="border px-4 py-2 bg-gray-200 border-gray-300 rounded">
            {props?.data?.slug}
          </p>
        ) : null}
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Hotel Name</label>
              <input placeholder="Hotel Name" type="text" {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Description</label>
              <input placeholder="Description" type="text" {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Hotel Location</label>
              <AsyncSelect
                isSearchable
                placeholder="Find Location"
                defaultOptions={location?.data?.map?.((a: CategoryT) => ({
                  label: a?.name,
                  value: a?._key,
                }))}
                cacheOptions
                loadOptions={searchLocation}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Hotel Category</label>
              <AsyncSelect
                isSearchable
                placeholder="Find Category"
                defaultOptions={data?.data?.map?.((a: CategoryT) => ({
                  label: a?.name,
                  value: a?._key,
                }))}
                cacheOptions
                loadOptions={searchCategory}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="currency"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Currency</label>
              <select {...field}>
                {HOTEL_CURRENCY.map((a) => {
                  return (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Hotel Status</label>
              <select {...field}>
                {HOTEL_STATUS.map((a) => {
                  return (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        />
        {pendingCreate || pendingUpdate ? (
          <div className="pt-4">
            <LoadingSVG className="w-6 h-6" />
          </div>
        ) : (
          <button
            type="submit"
            disabled={pendingCreate || pendingUpdate}
            className="bg-green-500 py-1 px-2 rounded text-white disabled:bg-gray-500 duration-500"
          >
            {props?.method === "CREATE" ? "Submit" : "Update"}
          </button>
        )}
      </form>

      {props?.method === "UPDATE" ? <HotelDelete /> : null}
    </div>
  );
};

export default withData<HotelT>(HotelForm, {
  apiScope: "hotel",
  queryKey: "hotel",
});
