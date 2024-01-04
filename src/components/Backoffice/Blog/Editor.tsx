"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { rstr } from "@/lib/listFunc";
import { LoadingSVG } from "@/components/Icons";

interface Props {
  value: string;
  onChange: (d: any) => void;
}

const BlogEditor = (props: Props) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: () =>
      client.post(
        "api/blog",
        { html: props.value, slug: rstr(10) },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
  });
  return (
    <div className="App">
      <CKEditor
        disabled={isPending}
        editor={ClassicEditor}
        data={props.value}
        onReady={(editor: any) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.onChange(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />

      <div className="w-full bg-white h-12 flex items-center px-4">
        {isPending ? (
          <LoadingSVG className="w-6 h-6 text-black" />
        ) : (
          <button onClick={() => mutate()}>
            <p className="text-blue-500 border border-blue-500 px-8">
              Save Blog
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
