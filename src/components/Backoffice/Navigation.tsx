"use client";
import { auth } from "@/lib/Firebase";
import { signOut } from "firebase/auth";

import Link from "next/link";
import { useStore } from "@/store";
import { useSelectedLayoutSegment } from "next/navigation";
const url = [
  { name: "Hotel", url: "/bo/hotel?page=1&limit=10" },
  { name: "Location", url: "/bo/location?page=1&limit=10" },
  { name: "Category", url: "/bo/category?page=1&limit=10" },
  { name: "Booking", url: "/bo/booking?checkIn=&checkOut=&page=1&limit=10" },
  { name: "Blog", url: "/bo/blog?page=1&limit=10" },
];

const Navigation = () => {
  const { user, dispatch } = useStore();
  const segments = useSelectedLayoutSegment();
  return (
    <div className="flex flex-col gap-4 p-2 z-30">
      <p className="text-white">{user ? user?.email : null}</p>
      {segments !== "auth" && (
        <>
          {url?.map((a) => (
            <>
              <Link
                key={a.name}
                href={`${a.url}`}
                shallow
                className={`text-white duration-500 ${
                  segments === a.name.toLocaleLowerCase()
                    ? "bg-black border-l p-1"
                    : null
                }`}
              >
                {a.name}
              </Link>
            </>
          ))}
          <button
            type="button"
            className="bg-white text-blue-500 p-1"
            onClick={() => {
              signOut(auth);
              dispatch({ user: undefined });
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Navigation;
