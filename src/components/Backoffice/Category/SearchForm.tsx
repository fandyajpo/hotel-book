"use client";

import { useRouter } from "next/navigation";
const SearchForm = () => {
  const { push } = useRouter();

  return (
    <div className="border rounded border-gray-300 p-4 flex items-center justify-between">
      <input
        placeholder="Search Category"
        onChange={(e) =>
          push(`/bo/category?q=${encodeURIComponent(e?.target?.value)}`)
        }
      />
    </div>
  );
};

export default SearchForm;
