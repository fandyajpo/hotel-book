export const dynamic = "force-dynamic";
import { blogBySlug } from "@/query/blog";
import { BlogT, SlugMeta } from "@/types";
import { Metadata, ResolvingMetadata } from "next/types";

export async function generateMetadata(
  { params }: SlugMeta,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog: BlogT = await blogBySlug(params?.slug as string);

  return {
    title: blog?.title,
    description: blog?.description,
    openGraph: {
      title: blog?.title,
      description: blog?.description,
    },
    twitter: {
      title: blog?.title,
      description: blog?.description,
    },
  };
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
