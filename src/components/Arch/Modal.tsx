"use client";
type Props = {
  id?: string;
  children: React.ReactNode;
};
const Modal = (props: Props) => {
  return <dialog id={props?.id}>{props.children}</dialog>;
};

export default Modal;
