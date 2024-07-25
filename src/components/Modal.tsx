import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: String;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-content bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg  bg-base-100 p-6">
        <div className="mb-4 flex  justify-between">
          <h3 className="mb-3 text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
