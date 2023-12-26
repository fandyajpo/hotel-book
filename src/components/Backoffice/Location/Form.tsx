"use client";
import CloseDialog from "./CloseDialog";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { LoadingSVG } from "@/components/Icons";
import { LocationT } from "@/types";
import Title from "../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import { documentById, slug } from "@/lib/listFunc";
import CategoryDelete from "./Delete";
type Option = {
  method?: "UPDATE" | "CREATE";
  data?: LocationT;
};

const LocationForm = (props?: Option) => {
  const { control, handleSubmit, reset } = useForm<LocationT>({
    mode: "all",
    defaultValues: props?.data,
  });

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationKey: ["createLocation"],
    mutationFn: (data: LocationT) =>
      client.post(
        "/api/location",
        { ...data, slug: slug(data?.name) },
        {
          method: "POST",
        }
      ),
    onSuccess: () => {
      reset({ name: "" });
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["locationSearch"] }),
        queryClient.invalidateQueries({ queryKey: ["locations"] }),
      ]);
    },
  });

  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateLocation"],
    mutationFn: (data: LocationT) =>
      client.patch(
        `/api/location/${data?._key}`,
        { ...data, slug: slug(data?.name) },
        {
          method: "PATCH",
        }
      ),
    onSuccess: () => {
      documentById(props?.data?._key as string)?.close?.();
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["locationSearch"] }),
        queryClient.invalidateQueries({ queryKey: ["locations"] }),
      ]);
    },
  });

  const submit = handleSubmit((data: LocationT) =>
    props?.method === "CREATE" ? create(data) : update(data)
  );

  return (
    <div className="border w-full border-gray-300 rounded">
      <form onSubmit={submit} className="w-96  p-4 space-y-2">
        <Title title="Location" />
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
              <label>Location Name</label>
              <input
                placeholder="Location"
                autoComplete="off"
                type="text"
                {...field}
              />
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

      {props?.method === "UPDATE" && !pendingUpdate && !pendingCreate ? (
        <>
          <CategoryDelete data={props?.data} />
          <CloseDialog id={props?.data?._key as string} />
        </>
      ) : null}
    </div>
  );
};

export default LocationForm;
