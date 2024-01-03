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
    <div className="h-10 w-fit flex justify-between items-center">
      {isPending ? (
        <LoadingSVG className="w-6 h-6" />
      ) : approve ? (
        <div className="gap-2 flex">
          <button
            type="button"
            onClick={() => setApprove(false)}
            className="bg-orange-500 text-white h-8 w-32 flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => mutate()}
            className="bg-red-500 text-white h-8 w-32 flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          onClick={() => setApprove(true)}
          className="bg-red-500 text-white h-8 w-32 flex items-center justify-center"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BookDelete;
