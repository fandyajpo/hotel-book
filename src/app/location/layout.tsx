import Layer from "@/components/Layout/Layer";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Location | East Land Bali",
  description: "East Land Bali",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center pb-44">
      <Layer isMiddle>{children}</Layer>
    </div>
  );
};

export default Layout;
