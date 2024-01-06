type Props = {
  id?: string;
  children: React.ReactNode;
};
const Modal = (props: Props) => {
  return (
    <dialog id={props?.id} key={props?.id} className="border shadow-sm rounded">
      {props.children}
    </dialog>
  );
};

export default Modal;
