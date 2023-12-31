interface Props {
  children: React.ReactNode;
  hotel: React.ReactNode;
  room: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <>
      {props.hotel}
      {props.children}
      {props.room}
    </>
  );
};

export default Layout;
