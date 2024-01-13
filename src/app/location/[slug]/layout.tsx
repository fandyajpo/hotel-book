import { locationById } from "@/server/location";
import { LocationT, SlugMeta } from "@/types";
import { unstable_cache } from "next/cache";
import { Metadata, ResolvingMetadata } from "next/types";

const getCachedLocation = unstable_cache(
  async (name) => locationById(name),
  ["my-app-location"]
);

export async function generateMetadata(
  { params }: SlugMeta,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const location = await getCachedLocation(params?.slug);
  return {
    title: `${location?.name} | EastLandBali` || "Location",
    description: location?.description || "No Description",
    openGraph: {
      title: `${location?.name} | EastLandBali` || "Location",
      description: location?.description || "No Description",
    },
    twitter: {
      title: `${location?.name} | EastLandBali` || "Location",
      description: location?.description || "No Description",
    },
  };
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
