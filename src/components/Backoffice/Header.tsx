interface Props {
  title: string;
  total: number;
}

const Header = (props: Props) => {
  return (
    <div className="border rounded border-gray-300 p-4 bg-white/90 flex items-center justify-between">
      <p className="text-black font-semibold">{props?.title}</p>
      <p className="font-semibold">{props?.total}</p>
    </div>
  );
};

export default Header;
