import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal?.();
    } else {
      dialogRef.current?.close?.();
    }
  }, [isOpen]);
  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box">{children}</div>
    </dialog>
  );
};
export default Modal;
