import { TrashIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import React from "react";
import { Announcement } from "types/Announcement";
import { useDeleteAnnouncementMutation } from "./announcementApiSlice";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";

type DeleteAnnouncementModalProps = {
  announcement: Announcement;
};

const DeleteAnnouncementModal: React.FC<DeleteAnnouncementModalProps> = ({
  announcement,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure("Delete Announcement");

  const [deleteAnnouncement, { isLoading }] = useDeleteAnnouncementMutation();

  const handleDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const onDelete = await deleteAnnouncement({
        id: announcement.id,
      }).unwrap();
      toast.success(onDelete);
      onClose();
    } catch (error) {
      toast.error((error as ErrorType).data.message);
    }
  };

  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={onOpen}>
        <TrashIcon className="h-6 w-6" />
      </button>
      <Modal onClose={onClose} isOpen={isOpen} title={"Delete Announcement"}>
        <p>The announcement below will be deleted</p>
        <p className="text-error">{announcement.title}</p>
        <div className="modal-action">
          <button
            onClick={handleDelete}
            className="btn btn-error"
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};
export default DeleteAnnouncementModal;
