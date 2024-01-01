"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LoadingSVG } from "@/components/Icons";
import { useState } from "react";
import { BookingT } from "@/types";
import { queryClient } from "@/provider/TanstackQuery";
import { documentById } from "@/lib/listFunc";

type Props = {
  data?: BookingT;
};

const BookDelete = (props: Props) => {
  const [approve, setApprove] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["delCat"],
    mutationFn: () =>
      client.delete(`api/booking/${props?.data?._key}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      documentById(props.data?._key as string)?.close?.();
      return queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
  return (
    <div className="h-14  w-fit flex justify-between px-6 items-center">
      {isPending ? (
        <LoadingSVG className="w-6 h-6" />
      ) : approve ? (
        <div className="gap-2 flex">
          <button
            type="button"
            onClick={() => setApprove(false)}
            className="text-orange-500 bg-white h-8 w-32 flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => mutate()}
            className="text-red-500 bg-white h-8 w-32 flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          onClick={() => setApprove(true)}
          className="text-red-500 bg-white h-8 w-32 flex items-center justify-center"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BookDelete;
