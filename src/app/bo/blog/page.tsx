import EditorComponent from "@/components/Backoffice/Blog/EditorComponent";
import BlogTable from "@/components/Backoffice/Blog/Table";
const Blog = () => {
  return (
    <>
      <EditorComponent method="CREATE" />
      <BlogTable />
    </>
  );
};

export default Blog;
