"use client";
import { documentById } from "@/lib/listFunc";
type Props = {
  id: string;
};
const CloseDialog = (props: Props) => {
  return (
    <div className="p-4">
      <button onClick={() => documentById(props.id)?.close?.()}>Close</button>
    </div>
  );
};

export default CloseDialog;
