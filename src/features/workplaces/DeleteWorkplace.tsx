import { TrashIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";
import { Workplace } from "types/Workplace";
import { useDeleteWorkplaceMutation } from "./workplacesApiSlice";
type DeleteWorkplaceProps = {
  workplace: Workplace;
};
const DeleteWorkplace: React.FC<DeleteWorkplaceProps> = ({ workplace }) => {
  const { isOpen, onOpen, onClose } = useDisclosure("Delete Workplace");
  const [deleteWorkplace, { isLoading }] = useDeleteWorkplaceMutation();
  const navigate = useNavigate();
  const onDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await deleteWorkplace({ id: workplace.id }).unwrap();
      toast.success("Workplace successfully deleted");
      onClose();
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error((error as ErrorType).data.message);
    }
  };

  return (
    <>
      <button className="btn btn-ghost text-error" onClick={onOpen}>
        <TrashIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title={"Delete Workplace"}>
        <p className=" overflow-hidden text-ellipsis ">
          Are you sure you want to delete{" "}
          <span className="text-error">{workplace.name}</span>? This action
          cannot be undone.
        </p>

        <div className="modal-action">
          <button
            onClick={onDelete}
            className=" btn btn-error w-full"
            disabled={!workplace || isLoading}
          >
            {isLoading ? "Deleting" : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteWorkplace;
