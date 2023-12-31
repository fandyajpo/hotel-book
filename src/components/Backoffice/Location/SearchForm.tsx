"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const { push } = useRouter();
  const { get } = useSearchParams();

  return (
    <div className="border rounded border-gray-300 bg-white/90 p-4 flex items-center justify-between">
      <input
        placeholder="Search Location"
        value={get("q") as string}
        onChange={(e) =>
          push(`/bo/location?q=${encodeURIComponent(e?.target?.value)}`)
        }
      />
    </div>
  );
};

export default SearchForm;
