import { blogBySlug } from "@/query/blog";
import { BlogT, Params } from "@/types";
import Layer from "@/components/Layout/Layer";
import Back from "@/components/Layout/Back";
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
      <Layer isMiddle>
        <Back />
        <section
          dangerouslySetInnerHTML={{ __html: blog.html }}
          className="py-24"
        />
      </Layer>
    </div>
  );
};

export default Blog;
