import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer?.imageFileResizer(
      file,
      300,
      300,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
