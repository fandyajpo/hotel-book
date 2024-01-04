"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
type Filtering = {
  checkIn: string;
  checkOut: string;
};
const DateFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { get } = useSearchParams()!;
  const { control, handleSubmit, reset } = useForm<Filtering>({
    mode: "onChange",
    defaultValues: {
      checkIn: get("checkIn") as any,
      checkOut: get("checkOut") as any,
    },
  });

  const onSubmit = handleSubmit((data: Filtering) => {
    return router.push(
      pathname +
        "?" +
        `checkIn=${data.checkIn}&checkOut=${data.checkOut}&page=1&limit=10`
    );
  });

  const clearFilter = () => {
    reset({ checkIn: undefined, checkOut: undefined });

    return router.push(pathname + "?" + `checkIn=&checkOut=&page=1&limit=10`);
  };

  return (
    <form onSubmit={onSubmit} className="space-x-2">
      <Controller
        rules={{
          required: true,
        }}
        name="checkIn"
        control={control}
        render={({ field }) => <input type="date" {...field} />}
      />
      <Controller
        rules={{
          required: true,
        }}
        name="checkOut"
        control={control}
        render={({ field }) => <input type="date" {...field} />}
      />
      <button className="w-24 h-10 bg-blue-500 text-white" type="submit">
        Apply
      </button>
      <button
        type="button"
        onClick={() => clearFilter()}
        className="w-24 h-10 bg-blue-500 text-white"
      >
        Clear
      </button>
    </form>
  );
};

export default DateFilter;
