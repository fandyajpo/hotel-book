"use client";
import BlogMetadata from "@/components/Backoffice/Blog/Form";
import { BlogT } from "@/types";
import dynamic from "next/dynamic";
import { useState } from "react";
const BlogEditor = dynamic(
  () => import("@/components/Backoffice/Blog/Editor"),
  { ssr: false }
);

type Option = {
  method?: "UPDATE" | "CREATE";
  data?: BlogT;
};

const EditorComponent = (props: Option) => {
  const [blog, setBlog] = useState<any>("");
  return (
    <div className="space-y-2">
      {props.method === "CREATE" ? null : <BlogMetadata />}
      <BlogEditor value={blog} onChange={setBlog} />
    </div>
  );
};

export default EditorComponent;
