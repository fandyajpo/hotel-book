"use client";
import { useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import {
  useRouter,
  useSelectedLayoutSegment,
  usePathname,
} from "next/navigation";

const SecureRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((user: User | null) => {
      if (segment === "auth" && user !== null) {
        return router.replace("/bo/hotel");
      }
    });
    return () => unsubsrcibe();
  }, [auth, pathname, segment]);

  return <>{children}</>;
};

export default SecureRoute;
