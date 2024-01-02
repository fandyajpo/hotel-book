"use client";
import { useRouter } from "next/navigation";
const Back = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-white border border-gray-300 rounded-full h-14 flex items-center">
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
        <p className="font-semibold">Back</p>
      </button>
    </div>
  );
};

export default Back;
