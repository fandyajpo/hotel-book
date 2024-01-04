import { blogBySlug } from "@/query/blog";
import { BlogT, Params } from "@/types";
import Layer from "@/components/Layout/Layer";
import Back from "@/components/Layout/Back";
import Loading from "./loading";
import { Suspense } from "react";
const Blog = async (
  props: Params<{
    params: {
      [code: string]: string;
    };
    searchParams: {
      [code: string]: string;
    };
  }>
) => {
  const blog: BlogT = await blogBySlug(props.params?.slug);
  return (
    <div className="flex justify-center">
      <Suspense fallback={<Loading />}>
        <Layer isMiddle>
          <Back />
          <div className="py-24 space-y-8">
            <p className="text-xl font-semibold">{blog?.title}</p>
            <hr />
            <section dangerouslySetInnerHTML={{ __html: blog.html }} />
          </div>
        </Layer>
      </Suspense>
    </div>
  );
};

export default Blog;
