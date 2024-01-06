"use client";
import { useRouter } from "next/navigation";

interface Props {
  title?: string;
}
const Back = (props: Props) => {
  const router = useRouter();
  return (
    <div className="w-full bg-white/20 backdrop-blur-sm border border-gray-300 rounded-xl h-16 flex items-center sticky top-2 z-50">
      <button
        type="button"
        className="flex items-center px-4 hover:underline"
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <p className="font-semibold">{props.title ? props.title : "Back"}</p>
      </button>
    </div>
  );
};

export default Back;
