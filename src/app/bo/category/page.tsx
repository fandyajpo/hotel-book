export const dynamic = "force-dynamic";
import CategoryTable from "@/components/Backoffice/Category/Table";
import CategoryForm from "@/components/Backoffice/Category/Form";
const BOCategory = async () => {
  return (
    <>
      <CategoryForm method="CREATE" />
      <CategoryTable />
    </>
  );
};

export default BOCategory;
