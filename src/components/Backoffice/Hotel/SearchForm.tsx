"use client";

import { useRouter } from "next/navigation";
interface Props {
  total: any;
}
const SearchForm = (props: Props) => {
  const { push } = useRouter();

  return (
    <div className="border rounded border-gray-300 bg-white/90 p-4 flex items-center justify-between">
      <input
        placeholder="Search Hotel"
        onChange={(e) =>
          push(`/bo/hotel?q=${encodeURIComponent(e?.target?.value)}`)
        }
      />
      <p>{props.total}</p>
    </div>
  );
};

export default SearchForm;
