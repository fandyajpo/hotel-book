import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!,
});

export default imageKit;
export type ImageKitFileT = {
  url: string;
  name: string;
  id: string;
};
