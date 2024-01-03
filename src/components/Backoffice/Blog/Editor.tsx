"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload/src/";

interface Props {
  value: string;
  onChange: (d: any) => void;
}

const BlogEditor = (props: Props) => {
  return (
    <div className="App">
      <h2>Using CKEditor&nbsp;5 build in React</h2>
      <CKEditor
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
    </div>
  );
};

export default BlogEditor;
