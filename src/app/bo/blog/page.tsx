import EditorComponent from "@/components/Backoffice/Blog/EditorComponent";
import BlogTable from "@/components/Backoffice/Blog/Table";
const Blog = () => {
  return (
    <>
      <p className="text-xl font-semibold text-white text-center">
        Create Blog
      </p>
      <EditorComponent method="CREATE" />
      <BlogTable />
    </>
  );
};

export default Blog;
