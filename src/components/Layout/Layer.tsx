interface Props {
  isMiddle?: boolean;
  children?: React.ReactNode;
}

const Layer = (props: Props) => {
  return (
    <div
      className={`md:max-w-2xl lg:max-w-5xl xl:max-w-7xl w-full h-full flex flex-col gap-x-4 md:p-2 p-4 ${
        props.isMiddle ? "flex items-center justify-center" : null
      }`}
    >
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Layer;
