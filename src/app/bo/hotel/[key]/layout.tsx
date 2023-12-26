import MenuSelector from "@/components/Backoffice/Hotel/MenuSelector";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MenuSelector />
      {children}
    </>
  );
};

export default Layout;
