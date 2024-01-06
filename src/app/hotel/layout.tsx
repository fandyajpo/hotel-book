import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Hotel | East Land Bali",
  description: "East Land Bali",
  openGraph: {
    title: "Hotel | East Land Bali",
    description: "East Land Bali",
  },
  twitter: {
    title: "Hotel | East Land Bali",
    description: "East Land Bali",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
