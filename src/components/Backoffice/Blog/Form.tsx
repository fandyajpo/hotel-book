"use client";

import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { BlogT } from "@/types";
import Title from "../../Arch/Title";
import { queryClient } from "@/provider/TanstackQuery";
import { LoadingSVG } from "@/components/Icons";
import { slug } from "@/lib/listFunc";
type Option = {
  method?: "UPDATE" | "CREATE";
  data?: BlogT;
};

const BlogMetadata = (props?: Option) => {
  const { control, handleSubmit, reset } = useForm<BlogT>({
    mode: "all",
    defaultValues: props?.data,
  });

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: (data: BlogT) =>
      client.post(
        "api/blog",
        { ...data },
        {
          method: "POST",
        }
      ),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["blogSearch"] }),
        queryClient.invalidateQueries({ queryKey: ["blog"] }),
        queryClient.invalidateQueries({ queryKey: ["blogs"] }),
      ]);
    },
  });

  const { mutate: update, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateBlog"],
    mutationFn: (data: BlogT) =>
      client.patch(
        `api/blog/${data?._key}`,
        {
          title: data?.title,
          description: data?.description,
          slug: slug(data?.title),
        } as BlogT,
        {
          method: "PATCH",
        }
      ),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["blogSearch"] }),
        queryClient.invalidateQueries({ queryKey: ["blog"] }),
        queryClient.invalidateQueries({ queryKey: ["blogs"] }),
      ]);
    },
  });

  const submit = handleSubmit((data: BlogT) =>
    props?.method === "CREATE" ? create(data) : update(data)
  );

  return (
    <div className="space-y-4 border w-full border-gray-300 bg-white/90 rounded">
      <form onSubmit={submit} className="w-full  p-4 space-y-2">
        <Title title="Blog MetaData" />
        {props?.data?.slug ? (
          <p className="border px-4 py-2 bg-gray-200 border-gray-300 rounded">
            {props?.data?.slug}
          </p>
        ) : null}
        <Controller
          control={control}
          name="title"
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Title</label>
              <input
                placeholder="Title"
                autoComplete="off"
                type="text"
                {...field}
              />
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
              <input
                placeholder="Title"
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
    </div>
  );
};

export default BlogMetadata;
