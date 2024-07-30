import { TrashIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import React from "react";
import { Announcement } from "types/Announcement";

type DeleteAnnouncementModalProps = {
  announcement: Announcement;
};

const DeleteAnnouncementModal: React.FC<DeleteAnnouncementModalProps> = ({
  announcement,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure("Delete Announcement");
  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={onOpen}>
        <TrashIcon className="h-6" />
        Delete
      </button>
      <Modal onClose={onClose} isOpen={isOpen} title={"Delete Announcement"}>
        <p>The announcement below will be deleted</p>
        {announcement.title}
      </Modal>
    </>
  );
};
export default DeleteAnnouncementModal;
