"use client";
import { useMutation } from "@tanstack/react-query";
import { BookingT } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { client } from "@/lib/axios";
import { queryClient } from "@/provider/TanstackQuery";
import { documentById } from "@/lib/listFunc";
import { LoadingSVG } from "@/components/Icons";

type Props = {
  data?: BookingT;
};

type FormValue = {
  active: boolean;
};

const BookDelete = (props: Props) => {
  const { control, handleSubmit, watch } = useForm<FormValue>({
    mode: "onChange",
    defaultValues: {
      active: false,
    },
  });

  const { active } = watch();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      client.patch(
        `api/booking/${props.data?._key}`,
        {
          roomId: props.data?.room?._key,
          ...props.data,
        },
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/app",
          },
        }
      ),
    mutationKey: ["updateBookStatus"],
    onSuccess: () => {
      documentById(props?.data?._key as string)?.close?.();
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["room"] }),
      ]);
    },
  });
  const onSubmit = () => {
    return mutate();
  };

  return (
    <>
      <hr className="my-2" />
      <p className="text-sm">
        If you click the checkbox below, a button will appear. Clicking this
        button will initiate the booking process
      </p>
      <hr className="my-2" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="active"
          defaultValue={false}
          render={({ field }) => (
            <div className="space-x-2">
              {/* @ts-ignore */}
              <input
                checked={field?.value}
                {...field}
                type="checkbox"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
              />
              <label>Accept</label>
            </div>
          )}
        />
        {active ? (
          <button
            type="submit"
            className="bg-green-500 text-white h-8 w-32 flex items-center justify-center"
          >
            {isPending ? (
              <LoadingSVG className="w-6 h-6 text-white" />
            ) : (
              "Start Session!"
            )}
          </button>
        ) : null}
      </form>
    </>
  );
};

export default BookDelete;
