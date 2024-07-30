import { PencilIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import React from "react";
import { Announcement } from "types/Announcement";

type EditAnnouncementModalProps = {
  announcement: Announcement;
};

const EditAnnouncementModal: React.FC<EditAnnouncementModalProps> = ({
  announcement,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure("Edit Announcement");

  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={onOpen}>
        <PencilIcon className="h-6" />
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title={"Edit Announcement"}>
        update announcement
      </Modal>
    </>
  );
};
export default EditAnnouncementModal;
