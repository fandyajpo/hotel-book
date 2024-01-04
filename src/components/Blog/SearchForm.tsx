"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const { push } = useRouter();
  const { get } = useSearchParams();

  return (
    <div className="w-full flex justify-center">
      <div className=" p-4 gap-2 flex flex-col  items-center justify-between">
        <p className="text-2xl">Our Blog</p>
        <input
          className="rounded-full w-80"
          placeholder="Search Blog"
          value={get("q") as string}
          onChange={(e) =>
            push(`/blog?q=${encodeURIComponent(e?.target?.value)}`)
          }
        />
      </div>
    </div>
  );
};

export default SearchForm;
