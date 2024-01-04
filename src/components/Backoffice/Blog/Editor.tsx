"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { rstr } from "@/lib/listFunc";
import { LoadingSVG } from "@/components/Icons";
import { MethodT } from "@/types";
import { useParams } from "next/navigation";

interface Props {
  value: string;
  onChange: (d: any) => void;
  method: MethodT;
}

const BlogEditor = (props: Props) => {
  const params = useParams();
  const { mutate: create, isPending: createLoading } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: () =>
      client.post(
        "api/blog",
        { html: props?.value, slug: rstr(10) },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
  });

  const { mutate: update, isPending: updateLoading } = useMutation({
    mutationKey: ["updateBlog"],
    mutationFn: () =>
      client.patch(
        `api/blog/${params?.key}`,
        { html: props?.value, method: "SAVE_BLOG" },
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
  });

  const submit = () => (props.method === "CREATE" ? create() : update());

  return (
    <div className="App">
      <CKEditor
        disabled={createLoading || updateLoading}
        editor={ClassicEditor}
        data={props.value}
        onReady={(editor: ClassicEditor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(_event, editor: ClassicEditor) => {
          const data = editor.getData();
          props.onChange(data);
        }}
        onBlur={(_event, editor: ClassicEditor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(_event, editor: ClassicEditor) => {
          console.log("Focus.", editor);
        }}
      />
      <div className="w-full bg-white h-12 flex items-center px-4">
        {createLoading || updateLoading ? (
          <LoadingSVG className="w-6 h-6 text-black" />
        ) : (
          <button onClick={submit}>
            <p className="text-blue-500 border border-blue-500 px-8">
              {props.method === "CREATE" ? "Create" : "Save changes"}
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
