import { SlugMeta } from "@/types";
import { Metadata, ResolvingMetadata } from "next/types";

export async function generateMetadata(
  { params }: SlugMeta,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "",
    description: "",
    openGraph: {
      title: "",
      description: "",
    },
    twitter: {
      title: "",
      description: "",
    },
  };
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
