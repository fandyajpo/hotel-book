import Navigation from "@/components/Backoffice/Navigation";
import SecureRoute from "@/provider/SecureRoute";
import { Metadata } from "next/types";
import AdminBG from "../../../public/admin-bg.jpg";
import Image from "next/image";
import AdminSide from "../../../public/admin-side.jpg";
export const metadata: Metadata = {
  title: "ELB Admin",
  description: "East Land Bali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex w-full">
      <div className="w-44 h-full z-10 bg-blue-700 relative">
        <Navigation />
        {/* <Image
          src={AdminSide}
          alt="ADMIN_SIDE"
          fill
          className="object-cover w-0 z-0"
        /> */}
      </div>
      <Image src={AdminBG} alt="ADMIN_BG" fill className="absolute z-0" />
      <div className="w-full p-8 overflow-y-auto space-y-4 z-10">
        <SecureRoute>{children}</SecureRoute>
      </div>
    </div>
  );
}
