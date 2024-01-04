import BlogList from "@/components/Blog/BlogList";
import Back from "@/components/Layout/Back";
import Layer from "@/components/Layout/Layer";

const Blogs = () => {
  return (
    <div className="flex justify-center w-full space-y-8">
      <Layer isMiddle>
        <div className="space-y-8">
          <Back />
          <BlogList />
        </div>
      </Layer>
    </div>
  );
};

export default Blogs;
