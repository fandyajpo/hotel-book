"use client";
import CloseDialog from "./CloseDialog";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { CategoryT } from "@/types";
import Title from "../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import { documentById } from "@/lib/listFunc";
import CategoryDelete from "./Delete";
import { LoadingSVG } from "@/components/Icons";
type Option = {
  method?: "UPDATE" | "CREATE";
  data?: CategoryT;
};

const CategoryForm = (props?: Option) => {
  const { control, handleSubmit, reset } = useForm<CategoryT>({
    mode: "all",
    defaultValues: props?.data,
  });

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: CategoryT) =>
      client.post(
        "api/category",
        { ...data },
        {
          method: "POST",
        }
      ),
    onSuccess: () => {
      reset({ name: "" });
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["categorySearch"] }),
        queryClient.invalidateQueries({ queryKey: ["categorys"] }),
      ]);
    },
  });

  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: (data: CategoryT) =>
      client.patch(
        `api/category/${data?._key}`,
        { ...data },
        {
          method: "PATCH",
        }
      ),
    onSuccess: () => {
      documentById(props?.data?._key as string)?.close?.();
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["categorySearch"] }),
        queryClient.invalidateQueries({ queryKey: ["categorys"] }),
      ]);
    },
  });

  const submit = handleSubmit((data: CategoryT) =>
    props?.method === "CREATE" ? create(data) : update(data)
  );

  return (
    <div className="space-y-4 border w-full border-gray-300 rounded">
      <form onSubmit={submit} className="w-96  p-4 space-y-2">
        <Title title="Category" />
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Category Name</label>
              <input
                placeholder="Category"
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

      {props?.method === "UPDATE" && !pendingCreate && !pendingUpdate ? (
        <>
          <CategoryDelete data={props?.data} />
          <CloseDialog id={props?.data?._key as string} />
        </>
      ) : null}
    </div>
  );
};

export default CategoryForm;
