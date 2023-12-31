import { LocationT, SlugMeta } from "@/types";
import { Metadata, ResolvingMetadata } from "next/types";

export async function generateMetadata(
  { params }: SlugMeta,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const location = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/location/search/${params?.slug}`,
    {
      method: "GET",
    }
  );

  const result: LocationT = await location.json();

  return {
    title: result?.name || "Location",
    description: result.name || "No Description",
    openGraph: {
      title: result?.name || "Location",
      description: result.name || "No Description",
    },
    twitter: {
      title: result?.name || "Location",
      description: result.name || "No Description",
    },
  };
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
