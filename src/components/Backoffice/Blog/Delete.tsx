"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LoadingSVG } from "@/components/Icons";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { queryClient } from "@/provider/TanstackQuery";
const BlogDelete = () => {
  const [approve, setApprove] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delBlog"],
    mutationFn: () => client.delete(`api/blog/${params?.key}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      return router.back();
    },
  });
  return (
    <div className="h-14 bg-red-500 w-full flex justify-between px-6 items-center">
      <p className="text-white">Delete Blog</p>
      {isPending ? (
        <LoadingSVG className="w-6 h-6 text-white" />
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

export default BlogDelete;
