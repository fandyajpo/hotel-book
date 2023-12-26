interface Props {
  title: string;
  total: number;
}

const Header = (props: Props) => {
  return (
    <div className="border rounded border-gray-300 p-4 flex items-center justify-between">
      <p className="text-blue-500 font-semibold">{props?.title}</p>
      <p className="font-semibold">{props?.total}</p>
    </div>
  );
};

export default Header;
