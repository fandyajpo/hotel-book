import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Blog | East Land Bali",
  description: "East Land Bali",
  openGraph: {
    title: "Blog | East Land Bali",
    description: "East Land Bali",
  },
  twitter: {
    title: "Blog | East Land Bali",
    description: "East Land Bali",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
