import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import { useParams } from "react-router-dom";
import { useAddNewAnnouncementMutation } from "./announcementApiSlice";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";
import { useState } from "react";

const NewAnnouncementModal = () => {
  const { id } = useParams<{ id: string }>();

  const { onClose, onOpen, isOpen } = useDisclosure("New Announcement");
  const [addNewAnnouncement, { isLoading }] = useAddNewAnnouncementMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const announcement = await addNewAnnouncement({
        workplace: id,
        title,
        description,
      }).unwrap();

      toast.success(announcement.message);
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      toast.error((error as ErrorType).data.message);
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={onOpen}>
        New Announcement
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title={"New Announcement"}>
        <form onSubmit={onSubmit}>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            placeholder="title"
            className="input w-full"
          />
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            type="text"
            placeholder="description"
            className="input w-full"
          />
          <div className="modal-action">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={!title || !description || isLoading}
            >
              Post
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewAnnouncementModal;
