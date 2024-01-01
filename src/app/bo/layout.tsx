import Navigation from "@/components/Backoffice/Navigation";
import SecureRoute from "@/provider/SecureRoute";
import { Metadata } from "next/types";

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
      <div className="w-44 h-full bg-blue-500">
        <Navigation />
      </div>
      <div className="w-full p-8 overflow-y-auto space-y-4">
        <SecureRoute>{children}</SecureRoute>
      </div>
    </div>
  );
}
