"use client";
import { useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { useStore } from "@/store";
import {
  useRouter,
  useSelectedLayoutSegment,
  usePathname,
} from "next/navigation";

const SecureRoute = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((user: User | null) => {
      if (user !== null) {
        dispatch({ user: user });
      }
      if (segment !== "auth" && user === null) {
        router.replace("/bo/auth");
      }
    });
    return unsubsrcibe;
  }, [auth, pathname, segment]);

  return <>{children}</>;
};

export default SecureRoute;
