export const dynamic = "force-dynamic";
import LocationTable from "@/components/Backoffice/Location/Table";
import LocationForm from "@/components/Backoffice/Location/Form";
const BOLocation = async () => {
  return (
    <>
      <LocationForm method="CREATE" />
      <LocationTable />
    </>
  );
};

export default BOLocation;
