"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { RoomT } from "@/types";
import Title from "../../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import { LoadingSVG } from "@/components/Icons";
import { useState } from "react";
type Option = {
  data?: RoomT;
};

const RoomCustomer = (props?: Option) => {
  const [cancel, setCancel] = useState<boolean>(false);
  const { handleSubmit } = useForm<RoomT>({
    mode: "all",
    defaultValues: props?.data,
  });
  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateRoomStatus"],
    mutationFn: () =>
      client.patch(
        `api/room/${props?.data?._key}`,
        { method: "END_SESSION" },
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: () => {
      setCancel(false);
      return queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });

  const submit = handleSubmit(() => {
    return update();
  });

  return (
    <div className="space-y-4">
      <form
        onSubmit={submit}
        className="border rounded border-gray-300 bg-white/90 p-4 space-y-2"
      >
        <Title title="Room Customer" />

        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Username</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {props?.data?.customer?.username}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {props?.data?.customer?.email}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Phone</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {props?.data?.customer?.phone}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Guest</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {props?.data?.customer?.guest}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Check In</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {props?.data?.customer?.checkIn}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Check Out</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {props?.data?.customer?.checkOut}
            </dd>
          </div>
        </dl>

        {pendingUpdate ? (
          <div className="pt-4">
            <LoadingSVG className="w-6 h-6" />
          </div>
        ) : cancel ? (
          <div>
            <p>Are you sure end this session?</p>
            <div className="space-x-2">
              <button
                onClick={() => setCancel(false)}
                type="button"
                disabled={pendingUpdate}
                className="bg-orange-500 py-1 px-2 rounded text-white disabled:bg-gray-500 duration-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pendingUpdate}
                className="bg-red-500 py-1 px-2 rounded text-white disabled:bg-gray-500 duration-500"
              >
                End Session!
              </button>
            </div>
          </div>
        ) : !props?.data?.customer || props?.data?.customer === null ? (
          <p className="bg-blue-500 py-1 px-2 rounded text-white disabled:bg-gray-500 duration-500">
            No Session are start
          </p>
        ) : (
          <button
            onClick={() => setCancel(true)}
            type="button"
            disabled={pendingUpdate}
            className="bg-red-500 py-1 px-2 rounded text-white disabled:bg-gray-500 duration-500"
          >
            End Session!
          </button>
        )}
      </form>
    </div>
  );
};

export default RoomCustomer;
