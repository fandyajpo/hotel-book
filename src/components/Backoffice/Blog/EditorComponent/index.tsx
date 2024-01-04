"use client";
import BlogMetadata from "@/components/Backoffice/Blog/Form";
import { BlogT, MethodT } from "@/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import withData from "@/components/Hoc/withData";
const BlogEditor = dynamic(
  () => import("@/components/Backoffice/Blog/Editor"),
  { ssr: false }
);

type Option = {
  method?: MethodT;
  data?: BlogT;
};

const EditorComponent = (props: Option) => {
  const [blog, setBlog] = useState<any>(props.data?.html);
  return (
    <div className="space-y-2">
      {props.method === "CREATE" ? null : <BlogMetadata data={props.data} />}
      <BlogEditor
        method={props?.method as MethodT}
        value={blog}
        onChange={setBlog}
      />
    </div>
  );
};

export default withData(EditorComponent, {
  apiScope: "blog",
  queryKey: "blog",
});
