"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { StatusT, RoomT } from "@/types";
import withData from "@/components/Hoc/withData";
import Title from "../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import { LoadingSVG } from "@/components/Icons";
import { useRouter, useParams } from "next/navigation";
import RoomMedia from "./Media";
import RoomDelete from "./Delete";

const HOTEL_STATUS: Array<StatusT> = ["DRAFT", "AVAILABLE"];

type Option = {
  method?: "UPDATE" | "CREATE";
  data?: RoomT;
};

const RoomForm = (props?: Option) => {
  const params = useParams();
  const { back } = useRouter();
  const { control, handleSubmit } = useForm<RoomT>({
    mode: "all",
    defaultValues:
      props?.method === "UPDATE"
        ? {
            ...props.data,
            type: {
              // @ts-ignore
              value: props?.data?.type?._key,
              label: props?.data?.type?.name,
            },
          }
        : { ...props?.data },
  });

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationKey: ["createRoom"],
    mutationFn: (data: RoomT) =>
      client.post("api/room", { ...data, hotel: params.key } as RoomT, {
        method: "POST",
      }),
    onSuccess: () => back(),
  });

  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateRoom"],
    mutationFn: (data: RoomT) =>
      client.patch(
        `api/room/${data?._key}`,
        { ...data, hotel: params.key } as RoomT,
        {
          method: "PATCH",
        }
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room"] }),
  });

  // const { data } = useQuery({
  //   queryKey: ["hotelCategory"],
  //   queryFn: () =>
  //     client.get(`api/room/search?search=`, {
  //       method: "GET",
  //     }),
  // });

  // const searchCategory = async (q: string) => {
  //   try {
  //     const rr = await client.get(`api/category/search?search=${q}`, {
  //       method: "GET",
  //     });
  //     return rr?.data?.map?.((a: CategoryT) => ({
  //       label: a?.name,
  //       value: a?._key,
  //     }));
  //   } catch (err) {
  //     return null;
  //   }
  // };

  const submit = handleSubmit((data: RoomT) => {
    props?.method === "CREATE" ? create(data) : update(data);
  });

  return (
    <div className="space-y-4">
      {props?.method === "UPDATE" ? (
        <RoomMedia media={props?.data?.image} />
      ) : null}
      <form
        onSubmit={submit}
        className="border rounded border-gray-300 p-4 space-y-2"
      >
        <Title title="Room Profile" />
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Room Name / Number</label>
              <input placeholder="Room Name" type="text" {...field} />
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
              <input placeholder="Room Description" type="text" {...field} />
            </div>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <Controller
            control={control}
            name="bed"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label>Bed</label>
                <input placeholder="Bed" type="number" {...field} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="bath"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label>Bath</label>
                <input placeholder="Bath" type="number" {...field} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="price"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label>Price</label>
                <input placeholder="Price" type="number" {...field} />
              </div>
            )}
          />
        </div>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Room Status</label>
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

      {props?.method === "UPDATE" ? <RoomDelete /> : null}
    </div>
  );
};

export default withData<RoomT>(RoomForm, {
  apiScope: "room",
  queryKey: "room",
});
