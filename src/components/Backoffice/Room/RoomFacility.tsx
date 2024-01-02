"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { RoomT } from "@/types";
import Title from "../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import { LoadingSVG } from "@/components/Icons";
type Option = {
  data?: RoomT;
};

const RoomFacility = (props?: Option) => {
  const { control, handleSubmit } = useForm<RoomT>({
    mode: "all",
    defaultValues: props?.data,
  });
  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateRoomFacility"],
    mutationFn: (data: RoomT) =>
      client.patch(
        `api/room/${props?.data?._key}/summary/${props?.data?.hotel?._key}`,
        { bath: data?.bath, bed: data?.bed } as RoomT,
        {
          method: "PATCH",
        }
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room"] }),
  });

  const submit = handleSubmit((data: RoomT) => {
    update(data);
  });

  return (
    <div className="space-y-4">
      <form
        onSubmit={submit}
        className="border rounded border-gray-300 bg-white/90 p-4 space-y-2"
      >
        <p>After updating the facilities, a summary process will follow</p>
        <Title title="Room Facility" />
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
        </div>

        {pendingUpdate ? (
          <div className="pt-4">
            <LoadingSVG className="w-6 h-6" />
          </div>
        ) : (
          <button
            type="submit"
            disabled={pendingUpdate}
            className="bg-green-500 py-1 px-2 rounded text-white disabled:bg-gray-500 duration-500"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default RoomFacility;
