import Image from "next/legacy/image";
import { useState, memo } from "react";
import { CameraSVG, LoadingSVG } from "../Icons/index";
interface Props {
  imageSource: string | undefined;
  parentStyle?: string;
  priority?: boolean;
}

const ImageLoader = memo((props: Props) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <div
        className={`relative w-full h-full overflow-hidden flex-none ${props.parentStyle}`}
      >
        {props?.imageSource && !error && props?.imageSource?.length > 0 ? (
          <Image
            priority={props.priority}
            quality={80}
            alt="projectImage"
            onLoad={() => setLoad(true)}
            onLoadingComplete={() => setTimeout(() => setLoad(false), 500)}
            layout="fill"
            onError={() => setError(true)}
            blurDataURL={props.imageSource}
            src={props.imageSource}
            className="w-full h-full flex-none object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CameraSVG className="w-8 h-8" />
          </div>
        )}
        <div
          className={`w-full flex items-center justify-center h-full absolute bg-white top-0 duration-200 ${
            load ? "opacity-50" : "opacity-0"
          }`}
        >
          <LoadingSVG className="w-8 h-8" />
        </div>
      </div>
    </>
  );
});
ImageLoader.displayName = "ImageLoader";
export default ImageLoader;
