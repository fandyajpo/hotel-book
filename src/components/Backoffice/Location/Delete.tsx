"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LoadingSVG } from "@/components/Icons";
import { useState } from "react";
import { CategoryT } from "@/types";
import { queryClient } from "@/provider/TanstackQuery";

type Props = {
  data?: CategoryT;
};

const LocationDelete = (props: Props) => {
  const [approve, setApprove] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["delCat"],
    mutationFn: () => client.delete(`/api/location/${props?.data?._key}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["locations"] }),
  });
  return (
    <div className="h-14 bg-red-500 w-full flex justify-between px-6 items-center">
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

export default LocationDelete;
