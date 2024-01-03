"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const BlogEditor = dynamic(
  () => import("@/components/Backoffice/Blog/Editor"),
  { ssr: false }
);

const Blog = () => {
  const [blog, setBlog] = useState<any>("");
  return (
    <div>
      <BlogEditor value={blog} onChange={setBlog} />
    </div>
  );
};

export default Blog;
